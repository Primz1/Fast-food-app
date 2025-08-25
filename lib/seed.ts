import * as FileSystem from "expo-file-system";
import { ID } from "react-native-appwrite";
import { appwriteConfig, databases, storage } from "./appwrite";
import dummyData from "./data";

interface Category {
  name: string;
  description: string;
}

interface Customization {
  name: string;
  price: number;
  type: "topping" | "side" | "size" | "crust" | string;
}

interface MenuItem {
  name: string;
  description: string;
  image_url: string;
  price: number;
  rating: number;
  calories: number;
  protein: number;
  category_name: string;
  customizations: string[];
}

interface DummyData {
  categories: Category[];
  customizations: Customization[];
  menu: MenuItem[];
}

const data = dummyData as DummyData;

async function clearAll(collectionId: string): Promise<void> {
  console.log(`🧹 Clearing collection: ${collectionId}`);
  try {
    const list = await databases.listDocuments(
      appwriteConfig.databaseId,
      collectionId
    );

    await Promise.all(
      list.documents.map((doc) =>
        databases.deleteDocument(appwriteConfig.databaseId, collectionId, doc.$id)
      )
    );
    console.log(`✅ Cleared collection: ${collectionId}`);
  } catch (err) {
    console.error(`❌ Failed to clear ${collectionId}`, err);
  }
}

async function clearStorage(): Promise<void> {
  console.log("🧹 Clearing storage bucket...");
  try {
    const list = await storage.listFiles(appwriteConfig.bucketId);

    await Promise.all(
      list.files.map((file) =>
        storage.deleteFile(appwriteConfig.bucketId, file.$id)
      )
    );
    console.log("✅ Storage cleared");
  } catch (err) {
    console.error("❌ Failed to clear storage", err);
  }
}

async function uploadImageToStorage(imageUrl: string) {
  try {
    console.log("⬇️ Downloading image:", imageUrl);

    // strip query params for clean file names
    const rawFileName = imageUrl.split("/").pop() || `file-${Date.now()}.jpg`;
    const cleanFileName = rawFileName.split("?")[0];
    const fileUri = FileSystem.cacheDirectory + cleanFileName;

    const downloaded = await FileSystem.downloadAsync(imageUrl, fileUri);
    const fileInfo = await FileSystem.getInfoAsync(downloaded.uri, { size: true });

    if (!fileInfo.exists || fileInfo.size === undefined) {
      throw new Error("File download failed or size not available");
    }

    const file = {
      uri: downloaded.uri,
      name: cleanFileName,
      type: "image/png",
      size: fileInfo.size,
    };

    console.log("⬆️ Uploading to Appwrite:", cleanFileName);
    const uploadedFile = await storage.createFile(
      appwriteConfig.bucketId,
      ID.unique(),
      file
    );

    const url = storage.getFileViewURL(appwriteConfig.bucketId, uploadedFile.$id);
    console.log("✅ Uploaded image:", url);
    return url;
  } catch (err) {
    console.error("❌ Failed to upload image:", imageUrl, err);
    return imageUrl; // fallback to original URL
  }
}

async function seed(): Promise<void> {
  console.log("🚀 Starting seeding process...");

  // 🧹 Clear old data first
  await clearAll(appwriteConfig.categoriesCollectionId);
  await clearAll(appwriteConfig.customizationsCollectionId);
  await clearAll(appwriteConfig.menuCollectionId);
  await clearAll(appwriteConfig.menuCustomizationCollectionId);
  await clearStorage();

  const categoryMap: Record<string, string> = {};
  for (const cat of data.categories) {
    console.log("📂 Creating category:", cat.name);
    try {
      const doc = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.categoriesCollectionId,
        ID.unique(),
        cat
      );
      console.log("✅ Created category:", doc.$id);
      categoryMap[cat.name] = doc.$id;
    } catch (err) {
      console.error("❌ Failed to create category:", cat.name, err);
    }
  }

  const customizationMap: Record<string, string> = {};
  for (const cus of data.customizations) {
    console.log("⚙️ Creating customization:", cus.name);
    try {
      const doc = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.customizationsCollectionId,
        ID.unique(),
        {
          name: cus.name,
          price: cus.price,
          type: cus.type,
        }
      );
      console.log("✅ Created customization:", doc.$id);
      customizationMap[cus.name] = doc.$id;
    } catch (err) {
      console.error("❌ Failed to create customization:", cus.name, err);
    }
  }

  const menuMap: Record<string, string> = {};
  for (const item of data.menu) {
    console.log("🍽️ Creating menu item:", item.name);
    try {
      const uploadedImage = await uploadImageToStorage(item.image_url);

      const doc = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.menuCollectionId,
        ID.unique(),
        {
          name: item.name,
          description: item.description,
          image_url: uploadedImage,
          price: item.price,
          rating: item.rating,
          calories: item.calories,
          protein: item.protein,
          category: categoryMap[item.category_name],
        }
      );

      console.log("✅ Created menu item:", doc.$id);
      menuMap[item.name] = doc.$id;

      for (const cusName of item.customizations) {
        if (!customizationMap[cusName]) {
          console.warn(`⚠️ Skipping missing customization: ${cusName}`);
          continue;
        }
        await databases.createDocument(
          appwriteConfig.databaseId,
          appwriteConfig.menuCustomizationCollectionId,
          ID.unique(),
          {
            menu: doc.$id,
            customizations: customizationMap[cusName],
          }
        );
        console.log(`🔗 Linked ${item.name} -> ${cusName}`);
      }
    } catch (err) {
      console.error("❌ Failed to create menu item:", item.name, err);
    }
  }

  console.log("✅✅✅ Seeding complete!");
}

export default seed;

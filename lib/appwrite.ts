import { CreateUserParams, GetMenuParams, SignInParams } from "@/type";
import { Account, Avatars, Client, Databases, ID, Query, Storage } from "react-native-appwrite";


export const appwriteConfig ={
    endpoint:process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    platform: "com.Paul.Fastfood",
    databaseId:'687689900014693713ed',
    bucketId:'687d542a00252db44a9b',
    userCollectionId: '687689af0036c5452e9f',
    categoriesCollectionId: '687d4ca8002e665cf11c',
    menuCollectionId: '687d4d6d000b490589bd',
    customizationsCollectionId: '687d4e9c000017041724',
    menuCustomizationCollectionId: '687d52f3000f901592dc'
    
}

export const client = new Client();

client
   .setEndpoint(appwriteConfig.endpoint)
   .setProject(appwriteConfig.projectId)
   .setPlatform(appwriteConfig.platform)


export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
const avatars = new Avatars(client);


export const createUser = async ({ email, password, name }: CreateUserParams) => {
    try{
        const newAccount = await account.create(ID.unique(), email, password, name)
        if(!newAccount) throw Error;

        const avatarUrl = avatars.getInitialsURL(name);
        
        await signIn({email, password});

        return await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            { email, name, accountId: newAccount.$id, avatar: avatarUrl }
        );

    } catch (e){
        throw new Error(e as string);
    }
}

export const signIn = async ({ email, password }: SignInParams) => {
    try{
        const session = await account.createEmailPasswordSession(email, password);
    }catch (e){
        throw new Error(e as string);
    }

}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if(!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if(!currentUser) throw Error;

        return currentUser.documents[0];
    } catch (e) {
        console.log(e);
        throw new Error(e as string);
    }
}

export const getMenu = async ({category, query}: GetMenuParams) => {
    try {
        const queries: string[] = [];

        if(category) queries.push(Query.equal('category', category));
        if(query) queries.push(Query.search('name', query));

        const menus = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.menuCollectionId,
            queries
        )

        return menus.documents;
    } catch (e) {
        throw new Error("e as string");
        
        
    }
}

export const getCategories = async () => {
    try {
        const categories = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.categoriesCollectionId,
        )

        return categories.documents;
    } catch (e) {
        throw new Error(e as string);
    }
}


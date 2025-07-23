import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

const MenuCard = ({ item }: { item: any }) => {
  if (!item?.image_url) {
    return <Text style={{ color: "red" }}>Image missing</Text>;
  }

  return (
    <TouchableOpacity style={styles.card}>
      <Image
        source={{ uri: item.image_url }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>From ${item.price}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 150,
    margin: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    padding: 10,
  },
  image: {
    width: "100%",
    height: 100,
    borderRadius: 10,
    backgroundColor: "#eee",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
  },
  price: {
    fontSize: 14,
    color: "gray",
  },
});

export default MenuCard;

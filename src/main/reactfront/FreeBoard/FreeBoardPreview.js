import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";






const FreeboardSection = ({ title, posts, onPostPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.postsContainer}>
        {posts.slice(0, 4).map((post, index) => (
          <React.Fragment key={post.id}>
            <TouchableOpacity
              onPress={() => onPostPress(post.id)}
              style={styles.postContainer}
            >
              <View style={styles.textContainer}>
                <Text style={styles.postTitle}>{post.title}</Text>
                <Text style={styles.postContent} numberOfLines={1}>
                  {post.content}
                </Text>
                <Text style={styles.postTime}>{post.time}</Text>
              </View>
              <View style={styles.iconContainer}>
                <View style={styles.iconWrapper}>
                  <Ionicons name="heart-outline" color="#718BAE" />
                  <Text style={styles.iconText}>{post.likes || 0}</Text>
                </View>
                <View style={styles.iconWrapper}>
                  <Ionicons name="chatbubble-outline" color="#718BAE" />
                  <Text style={styles.iconText}>{post.comments || 0}</Text>
                </View>
              </View>
            </TouchableOpacity>
            {index < posts.slice(0, 4).length - 1 && <DottedDivider />}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
};

const DottedDivider = () => (
  <View style={styles.dottedContainer}>
    {Array.from({ length: 60 }).map((_, index) => (
      <View key={index} style={styles.dot} />
    ))}
  </View>
);

export default FreeboardSection;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    color: "#2B4872",
    fontWeight: "bold",
    marginBottom: 15,
    left: 10,
  },
  postsContainer: {
    borderColor: "#E8E8E8",
    borderWidth: 0.18,
    borderRadius: 30,
    padding: 10,
  },
  postContainer: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center", // Center align items vertically
  },
  textContainer: {
    flex: 1,
  },
  postTitle: {
    paddingLeft: 7,
    fontSize: 16,
    fontWeight: "bold",
    paddingBottom: 7,
  },
  postContent: {
    paddingLeft: 8,
    color: "#555",
  },
  postTime: {
    paddingLeft: 9,
    color: "#888",
    fontSize: 12,
    marginTop: 5,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  iconText: {
    marginLeft: 5,
    color: "#888",
  },
  dottedContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    marginHorizontal: 12,
  },
  dot: {
    width: 3,
    height: 1,
    backgroundColor: "#D3DFEE",
  },
});
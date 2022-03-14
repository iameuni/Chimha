import React from "react";
import { Dimensions, Linking } from "react-native";
import { useTheme } from "@react-navigation/native";
import styled from "styled-components/native";
/**
 * ? Local Imports
 */
import { Text, Subtext } from "../../../shared/components/styled";
import RNBounceable from "@freakycoder/react-native-bounceable";
import { Article } from "@shared-interfaces/cafe";

interface IContent {
  post: Article;
}

const openUrl = async (appUrl: string, webUrl: string) => {
  const isValid = await Linking.canOpenURL(appUrl);
  const baseUrl = isValid ? appUrl : webUrl;

  try {
    await Linking.openURL(baseUrl);
  } catch (error) {
    console.log(error);
  }
};

const getArticleId = (url: string) => {
  return url.split("articleid=")[1].split("&")[0];
};

const Content = ({ post }: IContent) => {
  const theme = useTheme();
  const { colors } = theme;

  const PostContainer = styled.Pressable`
    margin-bottom: 6px;
    border-bottom-width: 1px;
    border-bottom-color: #ececec;
  `;

  const PostTextContainer = styled.View`
    flex-direction: row;
    margin-bottom: 4px;
  `;

  return (
    <PostContainer
      onPress={async () => {
        const articleId = getArticleId(post.link);
        await openUrl(
          // `navercafe://read?cafeUrl=zilioner&articleId=${articleId}`,
          post.link,
          post.link,
        );
      }}
    >
      <PostTextContainer>
        <Text color={colors.text} style={{ fontSize: 14 }}>
          {post.title}
        </Text>
      </PostTextContainer>
      <PostTextContainer>
        <Subtext color={colors.subtitle} style={{ marginRight: 8 }}>
          {post.author}
        </Subtext>
        <Subtext color={colors.subtitle}>{post.date}</Subtext>
      </PostTextContainer>
    </PostContainer>
  );
};

export default Content;

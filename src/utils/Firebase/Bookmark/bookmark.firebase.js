import { getUser, updateUser } from "../Users/users.firebase";

export async function addBookmark(word) {
  console.log(word, " Being added");
  // Get user's bookmark
  const bookmark = (await getBookmark()) || [];
  for (let i = 0; i < bookmark.length; i++) {
    // if (bookmark[i].koreanWord === word.koreanWord)
    if (bookmark[i].kor === word.kor) {
      alert("Already bookmarked");
      return;
    }
  }

  await updateUser({
    bookmark: [...bookmark, word],
  });
}

export async function getBookmark() {
  // Get user's bookmark
  const user = await getUser();
  // ADD CODE HERE
  //   console.log(user);
  //   console.log(user.bookmark);
  return user.bookmark;
}

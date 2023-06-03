import { parseStringPromise } from "xml2js";

export const searchDictionary = async (word) => {
  const url = process.env.REACT_APP_DICT_URL;
  const key = process.env.REACT_APP_DICT_KEY;
  const q = word;
  const translated = "y";
  const trans_lang = "1";
  const response = await fetch(
    `${url}?key=${key}&q=${q}&translated=${translated}&trans_lang=${trans_lang}`
  );
  const text = await response.text();
  const json = await parseStringPromise(text);
  console.log("Dictionary result: ", json);
  const wordObj = json.channel.item?.[0].sense?.[0];
  if (!wordObj) {
    return null;
  } else {
    const koreanWord = word;
    const koreanDefinition = wordObj.definition[0];
    const englishWord = wordObj.translation?.[0].trans_word[0];
    const englishDefinition = wordObj.translation?.[0].trans_dfn[0];

    return { koreanWord, koreanDefinition, englishWord, englishDefinition };
  }
};

export const searchWord = async (word) => {
  const url = "https://krdict.korean.go.kr/api/search";
  const key = "CB4BED3D7805E0C81E978DC973449090";
  const q = word;
  const translated = "y";
  const trans_lang = "1";
  const response = await fetch(
    `${url}?key=${key}&q=${q}&translated=${translated}&trans_lang=${trans_lang}`
  );
  const text = await response.text();
  const json = await parseStringPromise(text);
  const item = json.channel.item?.[0];
  let pronounciation;
  let origin;
  let wordGrade;
  let tempWordInfo = {};
  // if word is searched
  if (item) {
    tempWordInfo.baseForm = item.word[0];
    tempWordInfo.pos = item.pos[0];
    tempWordInfo.link = item.link[0];
    tempWordInfo.kor = json.channel.item?.[0].sense?.[0].definition[0];
    tempWordInfo.eng =
      json.channel.item?.[0].sense?.[0].translation?.[0].trans_dfn[0];
    if (item.pronunciation) {
      pronounciation = item.pronunciation[0];
      tempWordInfo.pronounciation = pronounciation;
    }
    if (item.origin) {
      origin = item.origin[0];
      tempWordInfo.origin = origin;
      // alert(origin);
    }
    if (item.word_grade) {
      wordGrade = item.word_grade[0];
      tempWordInfo.grade = wordGrade;
      // alert(wordGrade);
    }
    return tempWordInfo;
    //   setWordInfo(tempWordInfo);
    //   handleClose();
    //   setDialogOpen(true);
    //   console.log(open);
  } else {
    // change alert to MUI modal
    alert("No definition found");
  }
};

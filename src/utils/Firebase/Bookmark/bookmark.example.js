// BOOKMARK SCHEMA

const word = {
    koreanWord: "",
    koreanMeaning: "",
    englishWord: "",
    englishMeaning: ""
}

export const createWord = ({
    koreanWord,
    koreanMeaning,
    englishWord,
    englishMeaning
}) => {
    return {
        koreanWord,
        koreanMeaning,
        englishWord,
        englishMeaning
    }
}
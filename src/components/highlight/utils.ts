import { HighLightType } from '.';

export const transferHighLight = (text, searchValue) => {
  const fn = (str, searchText, realStr, strArr = []) => {
    const index = str.indexOf(searchText);
    if (index >= 0) {
      strArr.push({
        type: HighLightType.T,
        value: realStr.slice(0, index)
      });
      strArr.push({
        type: HighLightType.HL,
        value: realStr.slice(index, index + searchText.length)
      });
      const sliceIndex = index + searchText.length;
      return fn(str.slice(sliceIndex), searchText, realStr.slice(sliceIndex), strArr);
    }
    strArr.push({
      type: HighLightType.T,
      value: realStr
    });
    return strArr.filter(item => item.value);
  };
  if (!searchValue) {
    return [
      {
        type: HighLightType.T,
        value: text
      }
    ];
  }
  return fn(text.toLowerCase(), searchValue.toLowerCase(), text);
};

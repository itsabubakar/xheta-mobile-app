import * as FileSystem from "expo-file-system";
export const convertBase64 = async (fileUri: string) => {
  try {
    const base64 = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const base64Data = base64.replace(/^data:image\/\w+;base64,/, "");
    const result = `data:image/jpeg;base64,${base64Data}`;

    return result;
  } catch (error) {
    throw new Error(`Failed to convert file to base64: ${error}`);
  }
};

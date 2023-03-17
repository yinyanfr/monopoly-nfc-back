export async function readNFCTag() {
  try {
    const ndef = new NDEFReader();
    await ndef.scan();

    return new Promise((resolve, reject) => {
      ndef.addEventListener("readingerror", (err) => {
        reject(err);
      });

      ndef.addEventListener("reading", (e: any) => {
        const decoder = new TextDecoder();
        const data = {
          records: e?.message?.records?.map((rec: any) =>
            decoder.decode(rec?.data)
          ),
          serialNumber: e.serialNumber as string,
        };
        resolve(data);
      });
    });
  } catch (err) {
    throw err;
  }
}

export async function writeNFCTag(content: string) {
  try {
    const ndef = new NDEFReader();
    await ndef.write(content);
  } catch (error) {
    throw error;
  }
}

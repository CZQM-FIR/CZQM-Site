import mongoose from 'mongoose';
const { mongodb } = useRuntimeConfig();
export default async () => {
  mongoose
    // @ts-ignore
    .connect(mongodb.uri, mongodb.options)
    .then(() => console.info('[INFO] MongoDB Database Connected'))
    .catch((error) => console.error(`[ERROR] ${error}`));
};

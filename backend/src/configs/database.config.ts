import { connect, ConnectOptions } from "mongoose";

export const dbConnect = () => {
  connect(process.env.MONGO_URI!, {} as ConnectOptions).then(
    () => console.log("Connect Succesfully"),
    (error) => console.log(error)
  );
};

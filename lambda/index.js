/* const AWS = require("aws-sdk");
const sharp = require("sharp");
const shart = require("sharp");

const s3 = new AWS.S3();

exports.handler = () => async (event, context, callback) => {
  // s3에 업로드 됐을때
  const Bucket = e.Records[0].s3.bucket.name; // node-bird-s3
  const Key = decodeURIComponent(event.Records[0].s3.object.key); // 파일명(한글일경우 대비해서 decode해준다.)
  console.log(Bucket, Key);

  // 확장자 추출 로직
  const filename = Key.split("/")[Key.split("/").length - 1]; // upload/sonteve.jpg =>  [upload, sonteve.jpg] => sonteve.jpg
  const ext = Key.split(".")[Key.split(".").length - 1].toLowerCase(); // sonteve.jpg =>[sonteve, jpg] => jpg 확장자 대문자일경우 문제가되므로 소문자로
  const requiredFormat = ext === "jpg" ? "jpeg" : ext; // jpg => jpeg
  console.log("filename", filename, "ext", ext);

  try {
    const s3Object = await s3.getObject({ Bucket, Key }).promise(); //  특정이미지 파일명에 대한 객체 불러옴. getObject는 버킷정책에서 내가 권한줌
    console.log("original", s3Object.Body.length); // body안에 이미지가 binary로 들어있다. body.length 는 몇 byte인지 확인하는것.
    const resizedImage = await sharp(s3Object.Body)
      .resize(400, 400, {
        // 400 x 400사이즈로 리사이징
        fit: "inside",
      })
      .toFormat(requiredFormat) // 변경될 확장자를 포맷
      .toBuffer(); // 버퍼화한다.
    await s3
      .putObject({
        Bucket, //object 보낼 장소
        Key: `thumb/${filename}`, // 저장 이름
        Body: resizedImage, // s3Object.Body에 리사이징된 이미지를 넣는다.
      })
      .promise();
    console.log("put", resizedImage.length);
    return callback(null, `thumb/${filename}`);
  } catch (error) {
    console.error(error);
    return callback(error); // callback(서버쪽에러, 성공데이터);
  }
}; */

const AWS = require("aws-sdk");
const sharp = require("sharp");

const s3 = new AWS.S3();

exports.handler = async (event, context, callback) => {
  const Bucket = event.Records[0].s3.bucket.name; // react-nodebird-s3
  const Key = decodeURIComponent(event.Records[0].s3.object.key); // original/12312312_abc.png
  console.log(Bucket, Key);
  const filename = Key.split("/")[Key.split("/").length - 1];
  const ext = Key.split(".")[Key.split(".").length - 1].toLowerCase();
  const requiredFormat = ext === "jpg" ? "jpeg" : ext;
  console.log("filename", filename, "ext", ext);

  try {
    const s3Object = await s3.getObject({ Bucket, Key }).promise();
    console.log("original", s3Object.Body.length);
    const resizedImage = await sharp(s3Object.Body)
      .resize(400, 400, { fit: "inside" })
      .toFormat(requiredFormat)
      .toBuffer();
    await s3
      .putObject({
        Bucket,
        Key: `thumb/${filename}`,
        Body: resizedImage,
      })
      .promise();
    console.log("put", resizedImage.length);
    return callback(null, `thumb/${filename}`);
  } catch (error) {
    console.error(error);
    return callback(error);
  }
};

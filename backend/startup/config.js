module.exports = function (app, express, cors, file_upload,helmet,morgan) {
  app.use(express.json());
  // app.use(helmet())
  app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}))
  app.use(morgan("common"))
  app.use(cors());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.static("public"));
  app.use(
    file_upload({
      createParentPath: true,
      useTempFiles: true,
      tempFileDir: "/tmp",
    })
  );
};
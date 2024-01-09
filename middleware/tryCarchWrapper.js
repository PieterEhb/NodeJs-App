export function tryCatchWrapper(func) {
    return async (req, res, next) => {
      try {
        await func(req, res, next);
      } catch (error) {
        return res.status(500).json({message: "somerthing went wrong, please contact support"});
      }
    };
  }
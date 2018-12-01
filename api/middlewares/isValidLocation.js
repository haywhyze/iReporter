const isValidLocation = (req, res, next) => {
  const regexLocation = /^\(?[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?\)?)$/;

  if (!regexLocation.test(req.body.location)) {
    return res.status(400)
      .send({
        success: 'false',
        error: 'Lat Long coordinates not valid',
      });
  }
  return next();
};

export default isValidLocation;

/** REGULAR EXPRESSION EXPLANATION */

// ^                    starts with
// [-+]?                can accept + or -
// (                    start of a group (longitude)
//   [1-8]?\d             any digit from 0-89
//   (\.\d+)?             followed by a decimal point and one or more digits
//   |                    or
//   90                   90
//   (\.0+)               followed by a decimal point and one or more zeros
// )                    end of group(longitude) (range: -90 to +90)
// ,\s*                 comma and zero or more white space character
// [-+]?                can accept + or -
// (                    start of group (latitude)
//   180                  180
//   (\.0+)?              followed by a decimal point and one or more zeros
//   |                    or
//   (                    start of group
//     (1[0-7]\d)           any digit from 100-179
//     |                    or
//     ([1-9]?\d)           any digit from 0-99
//   )                    end of group
//   (\.\d+)?             followed by decimal point and one or more zeros (optionally)
// )                    end of group (latitude) (range -180 to +180)
// $                    end of regex
// reference https://stackoverflow.com/questions/3518504/regular-expression-for-matching-latitude-longitude-coordinates?noredirect=1&lq=1

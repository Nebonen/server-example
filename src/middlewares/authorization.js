import {findEntryById} from '../models/entryModel.js';
import {getUserByIdDB} from '../models/userModel.js';

const authorizeEntryOwner = async (req, res, next) => {
  const entry = await findEntryById(req.params.id);
  if (entry && entry.user_id === req.user.user_id) {
    next();
  } else {
    res.status(403).json({message: 'Forbidden: You do not own this entry.'});
  }
};

const authorizeUser = async (req, res, next) => {
  const user = await getUserByIdDB(req.params.id);
  if (user && user.user_id === req.user.user_id) {
    next();
  } else if (!user) {
    res.status(404).json({message: 'User not found'});
  } else {
    res
      .status(403)
      .json({message: 'Forbidden: You can only update your own user info.'});
  }
};

export {authorizeEntryOwner, authorizeUser};

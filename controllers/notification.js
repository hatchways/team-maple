import Notification from "../models/Notification";

exports.getNotifications = async (req, res, next) => {
  const { id } = req.user;

  try {
    const notifications = await Notification.find({ notifOwner: id });
    res
      .status(200)
      .json({ msg: "successful fetched notifications", notifications });
  } catch (e) {
    console.log(e);
  }
};

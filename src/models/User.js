import mongoose from "mongoose";

// تعريف schema للمستخدم
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // الاسم ضروري
  },
  email: {
    type: String,
    required: true,
    unique: true, // كل إيميل لازم يكون فريد
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: { 
    type: Date,
    default: Date.now, // وقت إنشاء الحساب
  },
});

const User = mongoose.model("User", userSchema);

export default User;

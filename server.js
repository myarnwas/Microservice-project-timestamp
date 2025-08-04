const express = require('express');
const app = express();

// لتفعيل CORS لاستخدامه من متصفحات مختلفة
const cors = require('cors');
app.use(cors());

// لخدمة ملفات HTML
app.use(express.static('views'));

// المسار الأساسي
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// المسار الأساسي لإرجاع التاريخ الحالي
app.get('/api', (req, res) => {
  const now = new Date();
  res.json({
    unix: now.getTime(),
    utc: now.toUTCString(),
  });
});

// المسار الذي يحتوي على باراميتر تاريخ
app.get('/api/:date', (req, res) => {
  let date = req.params.date;

  // إذا كان التاريخ رقمًا فقط (مثل Unix timestamp)
  if (!isNaN(date) && date.match(/^\d+$/)) {
    date = parseInt(date);
  }

  const parsedDate = new Date(date);

  // التحقق من صلاحية التاريخ
  if (parsedDate.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString(),
  });
});

// تشغيل السيرفر
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});

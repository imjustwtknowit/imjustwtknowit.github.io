const aYear = document.getElementById("aYear");
const aMonth = document.getElementById("aMonth");
const bDate = document.getElementById("bDate");
const wt = document.getElementById("weight");
const ht = document.getElementById("height");
const b = document.getElementById("bmi");

const calcBut = document.getElementById("calcBut");
const tText = document.getElementById("tText");
const svgF = document.getElementById("svgF");
const svgNS = "http://www.w3.org/2000/svg";
const img = document.getElementById("img");
const genderLk = document.getElementById("Lk");
const genderPr = document.getElementById("Pr");


const imgLink = [
"https://imjustwtknowit.github.io/assets/cht-wfa-boys-z-0-2_page-0001.jpg",
"https://imjustwtknowit.github.io/assets/cht-wfa-boys-z-2-5_page-0001.jpg",
"https://imjustwtknowit.github.io/assets/cht-wfa-girls-z-0-2_page-0001.jpg",
"https://imjustwtknowit.github.io/assets/cht-wfa-girls-z-2-5_page-0001.jpg",
"https://imjustwtknowit.github.io/assets/cht-lfa-boys-z-0-2_page-0001.jpg",
"https://imjustwtknowit.github.io/assets/cht-hfa-boys-z-2-5_page-0001.jpg",
"https://imjustwtknowit.github.io/assets/cht-lfa-girls-z-0-2_page-0001.jpg",
"https://imjustwtknowit.github.io/assets/cht-hfa-girls-z-2-5_page-0001.jpg",
"https://imjustwtknowit.github.io/assets/cht-wfl-boys-z-0-2_page-0001.jpg",
"https://imjustwtknowit.github.io/assets/cht-wfh-boys-z-2-5_page-0001.jpg",
"https://imjustwtknowit.github.io/assets/cht-wfl-girls-z-0-2_page-0001.jpg",
"https://imjustwtknowit.github.io/assets/cht-wfh-girls-z-2-5_page-0001.jpg",
"https://imjustwtknowit.github.io/assets/cht-bfa-boys-z-0-2_page-0001.jpg",
"https://imjustwtknowit.github.io/assets/cht-bfa-girls-z-0-2_page-0001.jpg",
"https://imjustwtknowit.github.io/assets/cdc-wfh-boys_page-0001.jpg",
"https://imjustwtknowit.github.io/assets/cdc-wfh-girls_page-0001.jpg",
"https://imjustwtknowit.github.io/assets/cdc-bfa-boys_page-0001.jpg",
"https://imjustwtknowit.github.io/assets/cdc-bfa-girls_page-0001.jpg"
]

const wfaVal = {
 res: ["Berat badan sangat kurang", "Berat badan kurang", "Berat badan normal", "Risiko berat badan lebih. Evaluasi dengan BB/TB atau IMT/U"],
  m3: [[2.1, 2.9, 3.8, 4.4, 4.9, 5.3, 5.7, 5.9, 6.2, 6.4, 6.6, 6.8, 6.9, 7.1, 7.2, 7.4, 7.5, 7.7, 7.8, 8.0, 8.1, 8.2, 8.4, 8.5, 8.6, 8.8, 8.9, 9.0, 9.1, 9.2, 9.4, 9.5, 9.6, 9.7, 9.8, 9.9, 10.0, 10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 10.7, 10.8, 10.9, 11.0, 11.1, 11.2, 11.3, 11.4, 11.5, 11.6, 11.7, 11.8, 11.9, 12.0, 12.1, 12.2, 12.3, 12.4], [2.0, 2.7, 3.4, 4.0, 4.4, 4.8, 5.1, 5.3, 5.6, 5.8, 5.9, 6.1, 6.3, 6.4, 6.6, 6.7, 6.9, 7.0, 7.2, 7.3, 7.5, 7.6, 7.8, 7.9, 8.1, 8.2, 8.4, 8.5, 8.6, 8.8, 8.9, 9.0, 9.1, 9.3, 9.4, 9.5, 9.6, 9.7, 9.8, 9.9, 10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 10.7, 10.8, 10.9, 11.0, 11.1, 11.2, 11.3, 11.4, 11.5, 11.6, 11.7, 11.8, 11.9, 12.0, 12.1]],
  m2: [[2.5, 3.4, 4.3, 5.0, 5.6, 6.0, 6.4, 6.7, 6.9, 7.1, 7.4, 7.6, 7.7, 7.9, 8.1, 8.3, 8.4, 8.6, 8.8, 8.9, 9.1, 9.2, 9.4, 9.5, 9.7, 9.8, 10.0, 10.1, 10.2, 10.4, 10.5, 10.7, 10.8, 10.9, 11.0, 11.2, 11.3, 11.4, 11.5, 11.6, 11.8, 11.9, 12.0, 12.1, 12.2, 12.4, 12.5, 12.6, 12.7, 12.8, 12.9, 13.1, 13.2, 13.3, 13.4, 13.5, 13.6, 13.7, 13.8, 14.0, 14.1], [2.4, 3.2, 3.9, 4.5, 5.0, 5.4, 5.7, 6.0, 6.3, 6.5, 6.7, 6.9, 7.0, 7.2, 7.4, 7.6, 7.7, 7.9, 8.1, 8.2, 8.4, 8.6, 8.7, 8.9, 9.0, 9.2, 9.4, 9.5, 9.7, 9.8, 10.0, 10.1, 10.3, 10.4, 10.5, 10.7, 10.8, 10.9, 11.1, 11.2, 11.3, 11.5, 11.6, 11.7, 11.8, 12.0, 12.1, 12.2, 12.3, 12.4, 12.6, 12.7, 12.8, 12.9, 13.0, 13.2, 13.3, 13.4, 13.5, 13.6, 13.7]],
  p1: [[3.9, 5.1, 6.3, 7.2, 7.8, 8.4, 8.8, 9.2, 9.6, 9.9, 10.2, 10.5, 10.8, 11, 11.3, 11.5, 11.7, 12, 12.2, 12.5, 12.7, 12.9, 13.2, 13.4, 13.6, 13.9, 14.1, 14.3, 14.5, 14.8, 15, 15.2, 15.4, 15.6, 15.8, 16, 16.2, 16.4, 16.6, 16.8, 17, 17.2, 17.4, 17.6, 17.8, 18, 18.2, 18.4, 18.6, 18.8, 19, 19.2, 19.4, 19.6, 19.8, 20, 20.2, 20.4, 20.6, 20.8, 21
], [3.7, 4.8, 5.8, 6.6, 7.3, 7.8, 8.2, 8.6, 9, 9.3, 9.6, 9.9, 10.1, 10.4, 10.6, 10.9, 11.1, 11.4, 11.6, 11.8, 12.1, 12.3, 12.5, 12.8, 13, 13.3, 13.5, 13.7, 14, 14.2, 14.4, 14.7, 14.9, 15.1, 15.4, 15.6, 15.8, 16, 16.3, 16.5, 16.7, 16.9, 17.2, 17.4, 17.6, 17.8, 18.1, 18.3, 18.5, 18.8, 19, 19.2, 19.4, 19.7, 19.9, 20.1, 20.3, 20.6, 20.8, 21, 21.2
]]
};

const hfaVal = {
	res: ["Sangat pendek", "Pendek", "Normal", "Tinggi. Mungkin mengalami gangguan endokrin"],
  m3: [[44.2, 48.9, 52.4, 55.3, 57.6, 59.6, 61.2, 62.7, 64, 65.2, 66.4, 67.6, 68.6, 69.6, 70.6, 71.6, 72.5, 73.3, 74.2, 75, 75.8, 76.5, 77.2, 78, 78.7, 78, 78.6, 79.3, 79.9, 80.5, 81.1, 81.7, 82.3, 82.8, 83.4, 83.9, 84.4, 85, 85.5, 86, 86.5, 87, 87.5, 88, 88.4, 88.9, 89.4, 89.8, 90.3, 90.7, 91.2, 91.6, 92.1, 92.5, 93, 93.4, 93.9, 94.3, 94.7, 95.2, 95.6, 96.1], [43.6, 47.8, 51, 53.5, 55.6, 57.4, 58.9, 60.3, 61.7, 62.9, 64.1, 65.2, 66.3, 67.3, 68.3, 69.3, 70.2, 71.1, 72, 72.8, 73.7, 74.5, 75.2, 76, 76.7, 76, 76.8, 77.5, 78.1, 78.8, 79.5, 80.1, 80.7, 81.3, 81.9, 82.5, 83.1, 83.6, 84.2, 84.7, 85.3, 85.8, 86.3, 86.8, 87.4, 87.9, 88.4, 88.9, 89.3, 89.8, 90.3, 90.7, 91.2, 91.7, 92.1, 92.6, 93, 93.4, 93.9, 94.3, 94.7, 95.2
]],
  m2: [[46.1, 50.8, 54.4, 57.3, 59.7, 61.7, 63.3, 64.8, 66.2, 67.5, 68.7, 69.9, 71, 72.1, 73.1, 74.1, 75, 76, 76.9, 77.7, 78.6, 79.4, 80.2, 81, 81.7, 81, 81.7, 82.5, 83.1, 83.8, 84.5, 85.1, 85.7, 86.4, 86.9, 87.5, 88.1, 88.7, 89.2, 89.8, 90.3, 90.9, 91.4, 91.9, 92.4, 93, 93.5, 94, 94.4, 94.9, 95.4, 95.9, 96.4, 96.9, 97.4, 97.8, 98.3, 98.8, 99.3, 99.7, 100.2, 100.7], [45.4, 49.8, 53, 55.6, 57.8, 59.6, 61.2, 62.7, 64, 65.3, 66.5, 67.7, 68.9, 70, 71, 72, 73, 74, 74.9, 75.8, 76.7, 77.5, 78.4, 79.2, 80, 79.3, 80, 80.8, 81.5, 82.2, 82.9, 83.6, 84.3, 84.9, 85.6, 86.2, 86.8, 87.4, 88, 88.6, 89.2, 89.8, 90.4, 90.9, 91.5, 92, 92.5, 93.1, 93.6, 94.1, 94.6, 95.1, 95.6, 96.1, 96.6, 97.1, 97.6, 98.1, 98.5, 99, 99.5, 99.9
]],
  p3: [[55.6, 60.6, 64.4, 67.6, 70.1, 72.2, 74, 75.7, 77.2, 78.7, 80.1, 81.5, 82.9, 84.2, 85.5, 86.7, 88, 89.2, 90.4, 91.5, 92.6, 93.8, 94.9, 95.9, 97, 96.3, 97.3, 98.3, 99.3, 100.3, 101.2, 102.1, 103, 103.9, 104.8, 105.6, 106.4, 107.2, 108, 108.8, 109.5, 110.3, 111, 111.7, 112.5, 113.2, 113.9, 114.6, 115.2, 115.9, 116.6, 117.3, 117.9, 118.6, 119.2, 119.9, 120.6, 121.2, 121.9, 122.6, 123.2, 123.9], [54.7, 59.5, 63.2, 66.1, 68.6, 70.7, 72.5, 74.2, 75.8, 77.4, 78.9, 80.3, 81.7, 83.1, 84.4, 85.7, 87, 88.2, 89.4, 90.6, 91.7, 92.9, 94, 95, 96.1, 95.4, 96.4, 97.4, 98.4, 99.4, 100.3, 101.3, 102.2, 103.1, 103.9, 104.8, 105.6, 106.5, 107.3, 108.1, 108.9, 109.7, 110.5, 111.2, 112, 112.7, 113.5, 114.2, 114.9, 115.7, 116.4, 117.1, 117.7, 118.4, 119.1, 119.8, 120.4, 121.1, 121.8, 122.4, 123.1, 123.7
]]
};

const wfh0Val = {
	res: ["Gizi buruk", "Gizi kurang", "Gizi baik", "Risiko gizi lebih", "Gizi lebih", "Obesitas"],
  h: [45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110
],
	m3: [[1.9, 2, 2.1, 2.3, 2.4, 2.6, 2.7, 2.9, 3.1, 3.3, 3.6, 3.8, 4, 4.3, 4.5, 4.7, 4.9, 5.1, 5.3, 5.5, 5.7, 5.9, 6.1, 6.3, 6.5, 6.6, 6.8, 7, 7.2, 7.3, 7.5, 7.6, 7.8, 7.9, 8.1, 8.2, 8.4, 8.5, 8.7, 8.9, 9.1, 9.3, 9.5, 9.7, 9.9, 10.1, 10.3, 10.5, 10.7, 10.8, 11, 11.2, 11.4, 11.6, 11.8, 12, 12.2, 12.4, 12.6, 12.8, 13, 13.3, 13.5, 13.7, 14, 14.2
], [1.9, 2, 2.2, 2.3, 2.4, 2.6, 2.8, 2.9, 3.1, 3.3, 3.5, 3.7, 3.9, 4.1, 4.3, 4.5, 4.7, 4.9, 5.1, 5.3, 5.5, 5.6, 5.8, 6, 6.1, 6.3, 6.5, 6.6, 6.8, 6.9, 7.1, 7.2, 7.4, 7.5, 7.7, 7.8, 8, 8.1, 8.3, 8.5, 8.7, 8.9, 9.1, 9.3, 9.5, 9.7, 9.9, 10.1, 10.2, 10.4, 10.6, 10.8, 11, 11.2, 11.4, 11.6, 11.8, 12, 12.3, 12.5, 12.7, 13, 13.2, 13.5, 13.7, 14
]],
  m2: [[2, 2.2, 2.3, 2.5, 2.6, 2.8, 3, 3.2, 3.4, 3.6, 3.8, 4.1, 4.3, 4.6, 4.8, 5.1, 5.3, 5.6, 5.8, 6, 6.2, 6.4, 6.6, 6.8, 7, 7.2, 7.4, 7.6, 7.7, 7.9, 8.1, 8.3, 8.4, 8.6, 8.7, 8.9, 9.1, 9.2, 9.4, 9.6, 9.8, 10, 10.2, 10.5, 10.7, 10.9, 11.1, 11.3, 11.5, 11.7, 11.9, 12.1, 12.3, 12.5, 12.7, 12.9, 13.2, 13.4, 13.6, 13.9, 14.1, 14.4, 14.6, 14.9, 15.1, 15.4
], [2.1, 2.2, 2.4, 2.5, 2.6, 2.8, 3, 3.2, 3.4, 3.6, 3.8, 4, 4.3, 4.5, 4.7, 4.9, 5.1, 5.3, 5.5, 5.7, 5.9, 6.1, 6.3, 6.5, 6.7, 6.9, 7, 7.2, 7.4, 7.5, 7.7, 7.8, 8, 8.2, 8.3, 8.5, 8.7, 8.8, 9, 9.2, 9.4, 9.7, 9.9, 10.1, 10.3, 10.5, 10.7, 10.9, 11.1, 11.3, 11.5, 11.7, 12, 12.2, 12.4, 12.6, 12.8, 13.1, 13.3, 13.6, 13.8, 14.1, 14.4, 14.7, 15, 15.3
]],
  p1: [[2.7, 2.9, 3, 3.2, 3.4, 3.6, 3.9, 4.1, 4.4, 4.7, 5, 5.3, 5.6, 5.9, 6.2, 6.5, 6.8, 7.1, 7.4, 7.6, 7.9, 8.2, 8.4, 8.7, 8.9, 9.2, 9.4, 9.6, 9.9, 10.1, 10.3, 10.6, 10.8, 11, 11.2, 11.4, 11.6, 11.8, 12, 12.2, 12.5, 12.8, 13, 13.3, 13.5, 13.8, 14.1, 14.3, 14.6, 14.8, 15.1, 15.3, 15.6, 15.9, 16.2, 16.5, 16.8, 17.1, 17.4, 17.8, 18.1, 18.5, 18.8, 19.2, 19.6, 20
], [2.7, 2.9, 3.1, 3.3, 3.5, 3.7, 3.9, 4.2, 4.4, 4.7, 5, 5.3, 5.6, 5.9, 6.2, 6.4, 6.7, 7, 7.3, 7.5, 7.8, 8, 8.3, 8.5, 8.7, 9, 9.2, 9.4, 9.6, 9.8, 10, 10.2, 10.4, 10.6, 10.8, 11, 11.3, 11.5, 11.8, 12, 12.3, 12.6, 12.8, 13.1, 13.4, 13.7, 13.9, 14.2, 14.5, 14.7, 15, 15.3, 15.6, 15.9, 16.2, 16.5, 16.8, 17.1, 17.5, 17.8, 18.2, 18.5, 18.9, 19.3, 19.7, 20.2
]],
  p2: [[3, 3.1, 3.3, 3.6, 3.8, 4, 4.2, 4.5, 4.8, 5.1, 5.4, 5.8, 6.1, 6.4, 6.8, 7.1, 7.4, 7.7, 8, 8.3, 8.6, 8.9, 9.2, 9.4, 9.7, 10, 10.2, 10.5, 10.8, 11, 11.3, 11.5, 11.7, 12, 12.2, 12.4, 12.6, 12.8, 13.1, 13.3, 13.6, 13.9, 14.2, 14.5, 14.7, 15, 15.3, 15.6, 15.8, 16.1, 16.4, 16.7, 17, 17.3, 17.6, 18, 18.3, 18.7, 19, 19.4, 19.8, 20.2, 20.6, 21, 21.4, 21.9
], [3, 3.2, 3.4, 3.6, 3.8, 4, 4.3, 4.6, 4.9, 5.2, 5.5, 5.8, 6.1, 6.5, 6.8, 7.1, 7.4, 7.7, 8, 8.3, 8.6, 8.8, 9.1, 9.4, 9.6, 9.9, 10.1, 10.3, 10.6, 10.8, 11, 11.2, 11.5, 11.7, 11.9, 12.1, 12.4, 12.6, 12.9, 13.2, 13.5, 13.8, 14.1, 14.4, 14.7, 15, 15.3, 15.6, 15.9, 16.2, 16.5, 16.8, 17.1, 17.5, 17.8, 18.1, 18.5, 18.9, 19.2, 19.6, 20, 20.5, 20.9, 21.3, 21.8, 22.3
]],
  p3: [[3.3, 3.5, 3.7, 3.9, 4.2, 4.4, 4.7, 5, 5.3, 5.6, 6, 6.3, 6.7, 7.1, 7.4, 7.8, 8.1, 8.5, 8.8, 9.1, 9.4, 9.7, 10, 10.3, 10.6, 10.9, 11.2, 11.5, 11.8, 12.1, 12.3, 12.6, 12.8, 13.1, 13.3, 13.6, 13.8, 14, 14.3, 14.6, 14.9, 15.2, 15.5, 15.8, 16.1, 16.4, 16.7, 17, 17.3, 17.6, 17.9, 18.2, 18.5, 18.9, 19.2, 19.6, 20, 20.4, 20.8, 21.2, 21.7, 22.1, 22.6, 23.1, 23.6, 24.1
], [3.3, 3.5, 3.7, 4, 4.2, 4.5, 4.8, 5.1, 5.4, 5.7, 6.1, 6.4, 6.8, 7.1, 7.5, 7.8, 8.2, 8.5, 8.8, 9.1, 9.5, 9.8, 10, 10.3, 10.6, 10.9, 11.1, 11.4, 11.7, 11.9, 12.2, 12.4, 12.6, 12.9, 13.1, 13.4, 13.7, 13.9, 14.2, 14.5, 14.9, 15.2, 15.5, 15.9, 16.2, 16.5, 16.9, 17.2, 17.5, 17.9, 18.2, 18.6, 18.9, 19.3, 19.6, 20, 20.4, 20.8, 21.3, 21.7, 22.2, 22.6, 23.1, 23.6, 24.2, 24.7
]]
};

const wfh2Val = {
	res: ["Gizi buruk", "Gizi kurang", "Gizi baik", "Risiko gizi lebih", "Gizi lebih", "Obesitas"],
  h: [65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120
],
  m3: [[5.9, 6.1, 6.2, 6.4, 6.6, 6.8, 6.9, 7.1, 7.3, 7.4, 7.6, 7.7, 7.9, 8, 8.2, 8.3, 8.5, 8.7, 8.8, 9, 9.2, 9.4, 9.6, 9.8, 10, 10.2, 10.4, 10.6, 10.8, 11, 11.1, 11.3, 11.5, 11.7, 11.9, 12.1, 12.3, 12.5, 12.8, 13, 13.2, 13.4, 13.7, 13.9, 14.1, 14.4, 14.6, 14.9, 15.2, 15.4, 15.7, 16, 16.2, 16.5, 16.8, 17.1
], [5.6, 5.8, 5.9, 6.1, 6.3, 6.4, 6.6, 6.7, 6.9, 7, 7.2, 7.3, 7.5, 7.6, 7.8, 7.9, 8.1, 8.3, 8.5, 8.6, 8.8, 9, 9.2, 9.4, 9.6, 9.8, 10, 10.2, 10.4, 10.6, 10.8, 10.9, 11.1, 11.3, 11.5, 11.7, 12, 12.2, 12.4, 12.6, 12.9, 13.1, 13.4, 13.7, 13.9, 14.2, 14.5, 14.8, 15.1, 15.4, 15.7, 16, 16.3, 16.6, 16.9, 17.3
]],
  m2: [[6.3, 6.5, 6.7, 6.9, 7.1, 7.3, 7.5, 7.7, 7.9, 8, 8.2, 8.4, 8.5, 8.7, 8.8, 9, 9.2, 9.3, 9.5, 9.7, 10, 10.2, 10.4, 10.6, 10.8, 11, 11.2, 11.4, 11.6, 11.8, 12, 12.2, 12.4, 12.6, 12.9, 13.1, 13.3, 13.6, 13.8, 14, 14.3, 14.5, 14.8, 15.1, 15.3, 15.6, 15.9, 16.2, 16.5, 16.8, 17.1, 17.4, 17.7, 18, 18.3, 18.6
], [6.1, 6.3, 6.4, 6.6, 6.8, 7, 7.1, 7.3, 7.5, 7.6, 7.8, 8, 8.1, 8.3, 8.4, 8.6, 8.8, 9, 9.2, 9.4, 9.6, 9.8, 10, 10.2, 10.4, 10.6, 10.9, 11.1, 11.3, 11.5, 11.7, 11.9, 12.1, 12.3, 12.5, 12.8, 13, 13.3, 13.5, 13.8, 14, 14.3, 14.6, 14.9, 15.2, 15.5, 15.8, 16.2, 16.5, 16.8, 17.2, 17.5, 17.8, 18.2, 18.5, 18.9
]],
  p1: [[8.1, 8.3, 8.6, 8.8, 9.1, 9.3, 9.6, 9.8, 10, 10.3, 10.5, 10.7, 10.9, 11.1, 11.3, 11.5, 11.7, 11.9, 12.2, 12.4, 12.7, 12.9, 13.2, 13.5, 13.7, 14, 14.2, 14.5, 14.7, 15, 15.3, 15.5, 15.8, 16.1, 16.4, 16.7, 17, 17.3, 17.7, 18, 18.4, 18.7, 19.1, 19.5, 19.8, 20.2, 20.7, 21.1, 21.5, 21.9, 22.4, 22.8, 23.3, 23.7, 24.1, 24.6
], [7.9, 8.2, 8.4, 8.7, 8.9, 9.1, 9.3, 9.5, 9.8, 10, 10.2, 10.4, 10.6, 10.8, 11, 11.2, 11.4, 11.7, 11.9, 12.2, 12.5, 12.7, 13, 13.3, 13.6, 13.8, 14.1, 14.4, 14.7, 14.9, 15.2, 15.5, 15.8, 16.1, 16.4, 16.7, 17, 17.4, 17.7, 18.1, 18.4, 18.8, 19.2, 19.6, 20, 20.5, 20.9, 21.4, 21.8, 22.3, 22.8, 23.3, 23.8, 24.2, 24.7, 25.2
]],
  p2: [[8.8, 9.1, 9.4, 9.6, 9.9, 10.2, 10.4, 10.7, 11, 11.2, 11.4, 11.7, 11.9, 12.1, 12.3, 12.6, 12.8, 13, 13.3, 13.5, 13.8, 14.1, 14.4, 14.7, 14.9, 15.2, 15.5, 15.8, 16, 16.3, 16.6, 16.9, 17.2, 17.5, 17.9, 18.2, 18.5, 18.9, 19.3, 19.7, 20.1, 20.5, 20.9, 21.3, 21.8, 22.2, 22.7, 23.1, 23.6, 24.1, 24.6, 25.1, 25.6, 26.1, 26.6, 27.2
], [8.7, 9, 9.3, 9.5, 9.8, 10, 10.3, 10.5, 10.7, 11, 11.2, 11.4, 11.6, 11.8, 12.1, 12.3, 12.6, 12.8, 13.1, 13.4, 13.7, 14, 14.3, 14.6, 14.9, 15.2, 15.5, 15.8, 16.1, 16.4, 16.7, 17, 17.4, 17.7, 18, 18.4, 18.7, 19.1, 19.5, 19.9, 20.3, 20.8, 21.2, 21.7, 22.1, 22.6, 23.1, 23.6, 24.2, 24.7, 25.2, 25.8, 26.3, 26.9, 27.4, 28
]],
  p3: [[9.6, 9.9, 10.2, 10.5, 10.8, 11.1, 11.4, 11.7, 12, 12.2, 12.5, 12.8, 13, 13.3, 13.5, 13.7, 14, 14.2, 14.5, 14.8, 15.1, 15.4, 15.7, 16, 16.3, 16.6, 16.9, 17.2, 17.5, 17.8, 18.1, 18.4, 18.8, 19.1, 19.5, 19.9, 20.3, 20.7, 21.1, 21.6, 22, 22.5, 22.9, 23.4, 23.9, 24.4, 25, 25.5, 26, 26.6, 27.2, 27.8, 28.3, 28.9, 29.5, 30.1
], [9.7, 10, 10.2, 10.5, 10.8, 11.1, 11.3, 11.6, 11.8, 12.1, 12.3, 12.6, 12.8, 13.1, 13.3, 13.6, 13.9, 14.1, 14.5, 14.8, 15.1, 15.4, 15.8, 16.1, 16.4, 16.8, 17.1, 17.4, 17.8, 18.1, 18.5, 18.8, 19.2, 19.5, 19.9, 20.3, 20.7, 21.1, 21.6, 22, 22.5, 23, 23.5, 24, 24.5, 25.1, 25.7, 26.2, 26.8, 27.4, 28.1, 28.7, 29.3, 29.9, 30.6, 31.2
]]
}

const bfaVal = {
	res: ["Gizi buruk", "Gizi kurang", "Gizi baik", "Risiko gizi lebih", "Gizi lebih", "Obesitas"],
  m3: [[10.2, 11.3, 12.5, 13.1, 13.4, 13.5, 13.6, 13.7, 13.6, 13.6, 13.5, 13.4, 13.4, 13.3, 13.2, 13.1, 13.1, 13, 12.9, 12.9, 12.8, 12.8, 12.7, 12.7, 12.7
], [10.1, 10.8, 11.8, 12.4, 12.7, 12.9, 13, 13, 13, 12.9, 12.9, 12.8, 12.7, 12.6, 12.6, 12.5, 12.4, 12.4, 12.3, 12.3, 12.2, 12.2, 12.2, 12.2, 12.1
]],
  m2: [[11.1, 12.4, 13.7, 14.3, 14.5, 14.7, 14.7, 14.8, 14.7, 14.7, 14.6, 14.5, 14.4, 14.3, 14.2, 14.1, 14, 13.9, 13.9, 13.8, 13.7, 13.7, 13.6, 13.6, 13.6
], [11.1, 12, 13, 13.6, 13.9, 14.1, 14.1, 14.2, 14.1, 14.1, 14, 13.9, 13.8, 13.7, 13.6, 13.5, 13.5, 13.4, 13.3, 13.3, 13.2, 13.2, 13.1, 13.1, 13.1
]],
  p1: [[14.8, 16.3, 17.8, 18.4, 18.7, 18.8, 18.8, 18.8, 18.7, 18.6, 18.5, 18.4, 18.2, 18.1, 18, 17.8, 17.7, 17.6, 17.5, 17.4, 17.3, 17.2, 17.2, 17.1, 17
], [14.6, 16, 17.3, 17.9, 18.3, 18.4, 18.5, 18.5, 18.4, 18.3, 18.2, 18, 17.9, 17.7, 17.6, 17.5, 17.4, 17.3, 17.2, 17.1, 17, 17, 16.9, 16.9, 16.8
]],
  p2: [[16.3, 17.8, 19.4, 20, 20.3, 20.5, 20.5, 20.5, 20.4, 20.3, 20.1, 20, 19.8, 19.7, 19.5, 19.4, 19.3, 19.1, 19, 18.9, 18.8, 18.7, 18.7, 18.6, 18.5
], [16.1, 17.5, 19, 19.7, 20, 20.2, 20.3, 20.3, 20.2, 20.1, 19.9, 19.8, 19.6, 19.5, 19.3, 19.2, 19.1, 18.9, 18.8, 18.8, 18.7, 18.6, 18.5, 18.5, 18.4
]],
  p3: [[18.1, 19.4, 21.1, 21.8, 22.1, 22.3, 22.3, 22.3, 22.2, 22.1, 22, 21.8, 21.6, 21.5, 21.3, 21.2, 21, 20.9, 20.8, 20.7, 20.6, 20.5, 20.4, 20.3, 20.3
], [17.7, 19.1, 20.7, 21.5, 22, 22.2, 22.3, 22.3, 22.2, 22.1, 21.9, 21.8, 21.6, 21.4, 21.3, 21.1, 21, 20.9, 20.8, 20.7, 20.6, 20.5, 20.4, 20.4, 20.3
]]
}



const plotArr = {
	wfaWhoBoy0: [0, 66, 301, 0, 8, 2, 14.95, 14.05],
  wfaWhoBoy2: [1, 66, 301, 24, 0, 8, 9.97, 11.5],
  wfaWhoGirl0: [2, 66, 301, 0, 8, 2, 14.95, 14.05],
  wfaWhoGirl2: [3, 66, 301, 24, 0, 7, 9.97, 10],
  hfaWhoBoy0: [4, 66, 301, 0, 12, 45, 14.95, 4.03],
  hfaWhoBoy2: [5, 66, 301, 24, 19, 80, 9.97, 4.69],
  hfaWhoGirl0: [6, 66, 301, 0, 12, 45, 14.95, 4.03],
  hfaWhoGirl2: [7, 66, 301, 24, 19, 80, 9.97, 4.69],
  wfhWhoBoy0: [8, 66, 301, 45, 10, 2, 5.52, 9.54],
  wfhWhoBoy2: [9, 66, 301, 65, 9, 6 , 6.53, 8.83],
  wfhWhoGirl0: [10, 66, 301, 45, 10, 2, 5.52, 9.54],
  wfhWhoGirl2: [11, 66, 301, 65, 12.7, 6, 6.53, 8.35],
  bfaWhoBoy0: [12, 66, 301, 0, 13.5, 10, 14.95, 16.91],
  bfaWhoGirl0: [13, 66, 301, 0, 13.5, 10, 14.95, 16.91],
  wfaCdcBoy2: [14, 89.3, 589.5, 2, 14, 10, 17.54, 3.3],
  hfaCdcBoy2: [14, 89.3, 589.5, 2, 129.5, 80, 17.54, 3.3],
  wfaCdcGirl2: [15, 89.3, 589.5, 2, 14, 10, 17.54, 3.3],
  hfaCdcGirl2: [15, 89.3, 589.5, 2, 129.5, 80, 17.54, 3.3],
  bfaCdcBoy2: [16, 67.2, 565, 2, 37, 12, 19.98, 18.58],
  bfaCdcGirl2: [17, 67.2, 565, 2, 37, 12, 19.98, 18.58]
}


const itp = document.getElementById("res");

let chartType;

test("wfa");


function changeAge(){

	const nD = new Date();
  let yN = nD.getFullYear();
  let mN = 1 + nD.getMonth();
  let dN = nD.getDate();
  
  let bD = bDate.value;
  let yB = Number(bD.slice(0,4));
  let mB = Number(bD.slice(5,7));
  let dB = Number(bD.slice(8,10));

  
  let yAge;
  let mAge;
  let dAge;
  
  if (dN >= dB){
  	dAge = dN - dB;
  } else {
  	dAge = 30 + dN - dB;
    mN = mN - 1;
  }
  
  if (mN >= mB){
  	mAge = mN - mB;
  } else {
  	mAge = 12 + mN - mB;
    yN = yN - 1;
  }
  
  yAge = yN - yB;
  
  
  aYear.value = yAge;
  aMonth.value = mAge;
  

  
}


function resetDate(){
	bDate.value = "";
}

async function calcIt(){
  let gen;
  if (genderLk.checked == true){
  	gen = Number(genderLk.value);
  } else if (genderPr.checked == true){
  	gen = Number(genderPr.value);
  }

  
  let y = Number(aYear.value);
  let m = Number(aMonth.value);
  let w = Number(wt.value);
  let h = Number(ht.value);
  let bmi = w/((h/100)**2);
  bmi = Math.round(bmi*100)/100;
  let age = 12*y + m;
  
  b.innerHTML = bmi;
  
  let cLink, x0, y0, valAtx0, y1, valAty1, xI, yI;
  let xVal, yVal;
  let res;
  
  let valArr = getVal(chartType, gen, age, w, h, bmi);
  
  tText.innerHTML = bmi;
  
  let plotVal = valArr[0];
  
  cLink = plotVal[0];
  x0 = plotVal[1];
  y0 = plotVal[2];
  valAtx0 = plotVal[3];
  y1 = plotVal[4];
  valAty1 = plotVal[5];
  xI = plotVal[6];
  yI = plotVal[7];
  
  xVal = valArr[1];
  yVal = valArr[2];
  

  
  img.setAttribute("href", imgLink[cLink]);

	res = getRes(chartType, gen, age, w, h, bmi);
  itp.innerHTML = res;
  
  await waitForImage(img);
  
  let old = document.getElementById("plot");
  if (old !== null){
  	old.remove();
  }

  const pl = document.createElementNS(svgNS, "circle");
  pl.setAttribute("cx", x0 + (xVal - valAtx0)*xI);
  pl.setAttribute("cy", y0 - y1 - (yVal - valAty1)*yI);
  pl.setAttribute("r", 1.5);
  pl.setAttribute("stroke", "transparent");
  pl.setAttribute("fill", "red");
  pl.setAttribute("id", "plot");
  svgF.appendChild(pl);
}



function getVal(c, g, a, w, h, b){
	let cType = c;
  let gen = g;
  let age = a;
  let cLink, x0, y0, valAtx0, y1, valAty1, xI, yI;
  let xVal, yVal;
  
  let plotVal;
  
  switch(cType){
  	case "wfa":
    	yVal = w;
      xVal = age;
    	if (gen == 1){
      	if (age <= 24){
          plotVal = plotArr.wfaWhoBoy0.slice();
        } else if (age <= 60){
          plotVal = plotArr.wfaWhoBoy2.slice();
        } else {
        	xVal = xVal/12;
          plotVal = plotArr.wfaCdcBoy2.slice();
        }
      } else if (gen == 2){
      	if (age <= 24){
        	plotVal = plotArr.wfaWhoGirl0.slice();
        } else if (age <= 60){
        	plotVal = plotArr.wfaWhoGirl2.slice();
        } else {
        	xVal = xVal/12;
          plotVal = plotArr.wfaCdcGirl2.slice();
        }    
      }
      break;
    case "hfa":
     	yVal = h;
      xVal = age;
      if (gen == 1){
      	if (age <= 24){
        	plotVal = plotArr.hfaWhoBoy0.slice();
        } else if (age <= 60){
        	plotVal = plotArr.hfaWhoBoy2.slice();
        } else {
        	xVal = xVal/12;
          plotVal = plotArr.hfaCdcBoy2.slice();
        }
      } else if (gen == 2){
      	if (age <= 24){
        	plotVal = plotArr.hfaWhoGirl0.slice();
        } else if (age <= 60){
        	plotVal = plotArr.hfaWhoGirl2.slice();
        } else {
        	xVal = xVal/12;
          plotVal = plotArr.hfaCdcGirl2.slice();
        }      
      }
    	break;
    case "wfh":
     	yVal = w;
      xVal = h;
      if (gen == 1){
      	if (age <= 24){
        	plotVal = plotArr.wfhWhoBoy0.slice();
        } else if (age <= 60){
        	plotVal = plotArr.wfhWhoBoy2.slice();
        } else {
        	plotVal = plotArr.wfaCdcBoy2.slice();
        }
      } else if (gen == 2){
      	if (age <= 24){
        	plotVal = plotArr.wfhWhoGirl0.slice();
        } else if (age <= 60){
        	plotVal = plotArr.wfhWhoGirl2.slice();
        } else {
        	plotVal = plotArr.wfaCdcGirl2.slice();
        }      
      }
    	break;
    case "bfa":
     	yVal = b;
      xVal = age;
      if (gen == 1){
      	if (age <= 24){
        	plotVal = plotArr.bfaWhoBoy0.slice();
        } else {
        	xVal = xVal/12;
          plotVal = plotArr.bfaCdcBoy2.slice();
        }
      } else if (gen == 2){
      	if (age <= 24){
        	plotVal = plotArr.bfaWhoGirl0.slice();
        } else {
        	xVal = xVal/12;
          plotVal = plotArr.bfaCdcGirl2.slice();
        }      
      }
    default:
    	tText.innerHTML = "Error!";
  }
  
  let theArr = [plotVal, xVal, yVal];
  
  return theArr;
  
}

function getRes(c, g, a, w, h, b){
	let cType = c;
  let gen = g;
  let age = a;
  let xVal;
  let yVal;
  let res;
  
  switch(cType){
  	case "wfa":
      yVal = w;
      if (age <= 60){
        if (yVal < wfaVal.m3[gen - 1][age]){
          res = wfaVal.res[0];
        } else if (yVal < wfaVal.m2[gen - 1][age]){
          res = wfaVal.res[1];
        } else if (yVal <= wfaVal.p1[gen - 1][age]){
          res = wfaVal.res[2];
        } else {
          res = wfaVal.res[3];
        }
      }
      break;
    case "hfa":
      yVal = h;
      if (age <= 60){      
        if (yVal < hfaVal.m3[gen - 1][age]){
          res = hfaVal.res[0];
        } else if (yVal < hfaVal.m2[gen - 1][age]){
          res = hfaVal.res[1];
        } else if (yVal <= hfaVal.p3[gen - 1][age]){
          res = hfaVal.res[2];
        } else {
          res = hfaVal.res[3];
        }
      }
      break;
    case "wfh":
    	yVal = w;
      xVal = h;
      if (age <= 24){
        let hInd = wfh0Val.h.indexOf(xVal);
        if (yVal < wfh0Val.m3[gen - 1][hInd]){
          res = wfh0Val.res[0];
        } else if (yVal < wfh0Val.m2[gen - 1][hInd]){
          res = wfh0Val.res[1];
        } else if (yVal <= wfh0Val.p1[gen - 1][hInd]){
          res = wfh0Val.res[2];
        } else if (yVal <= wfh0Val.p2[gen - 1][hInd]){
          res = wfh0Val.res[3];
        } else if (yVal <= wfh0Val.p3[gen - 1][hInd]){
          res = wfh0Val.res[4];
        } else {
          res = wfh0Val.res[5];
        }  
      } else if (age <= 60){
      	let hInd = wfh2Val.h.indexOf(xVal);
        if (yVal < wfh2Val.m3[gen - 1][hInd]){
          res = wfh2Val.res[0];
        } else if (yVal < wfh2Val.m2[gen - 1][hInd]){
          res = wfh2Val.res[1];
        } else if (yVal <= wfh2Val.p1[gen - 1][hInd]){
          res = wfh2Val.res[2];
        } else if (yVal <= wfh2Val.p2[gen - 1][hInd]){
          res = wfh2Val.res[3];
        } else if (yVal <= wfh2Val.p3[gen - 1][hInd]){
          res = wfh2Val.res[4];
        } else {
          res = wfh2Val.res[5];
        }
      }
      break;
    case "bfa":
    	yVal = b;
      if (age <= 24){
        if (yVal < bfaVal.m3[gen - 1][age]){
          res = bfaVal.res[0];
        } else if (yVal < bfaVal.m2[gen - 1][age]){
          res = bfaVal.res[1];
        } else if (yVal <= bfaVal.p1[gen - 1][age]){
          res = bfaVal.res[2];
        } else if (yVal <= bfaVal.p2[gen - 1][age]){
          res = bfaVal.res[3];
        } else if (yVal <= bfaVal.p3[gen - 1][age]){
          res = bfaVal.res[4];
        } else {
          res = bfaVal.res[5];
        }
      }
    	break;
  	default:
    	tText.innerHTML = "Error!";
  }
  
  return res;
  
}


function tellMe(event){
	let x = event.offsetX;
  let y = event.offsetY;
  tText.innerHTML = x + "," + y;
}

function test(a){
	const chartBut = document.getElementsByClassName("chartBut");
  const bActive = document.getElementById(a);
  chartType = a;
  calcBut.removeAttribute("disabled");
  //tText.innerHTML = a;
  
  bActive.setAttribute("style", "background-color: gray");
  let i = 0
  while (i < 4){
  	if (chartBut[i].getAttribute("id") !== a){
    	chartBut[i].setAttribute("style", "background-color: kightgray");
    }
    i ++;
  }
  if (genderLk.checked == true || genderPr.checked == true){
  	calcIt();
  }
}


function testPlot(){
	let x0, y0, valAtx0, y1, valAty1, xI, yI;
  let plot = plotArr.bfaCdcBoy2;
  x0 = plot[1];
  y0 = plot[2];
  valAtx0 = plot[3];
  y1 = plot[4];
  valAty1 = plot[5];
  xI = plot[6];
  yI = plot[7];
	for (let i = 0; i < 16; i ++){
    let xVal = 3 + i;
    let yVal = 12 + i;
    const pl = document.createElementNS(svgNS, "circle");
    pl.setAttribute("cx", x0 + (xVal - valAtx0)*xI);
    pl.setAttribute("cy", y0 - y1 - (yVal - valAty1)*yI);
    pl.setAttribute("r", 1.5);
    pl.setAttribute("stroke", "transparent");
    pl.setAttribute("fill", "red");
    pl.setAttribute("id", "plot");
    svgF.appendChild(pl);
  }
  

}

function waitForImage(imgElem) {
    return new Promise(function(resolve) {
        if (imgElem.complete) {
            return resolve();
        }
        imgElem.onload = function(){return resolve()};


    });
}

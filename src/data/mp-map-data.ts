export interface DistrictShape {
  id: string;
  name: string;
  path: string;
  cx: number;
  cy: number;
  region: "North" | "Central" | "West" | "East" | "South";
}

// Calibrated 800x540 viewBox polygon shapes for all 52 districts of Madhya Pradesh
export const MP_DISTRICT_SHAPES: DistrictShape[] = [
  // Far North (Chambal & Gwalior division)
  { id: "sheopur", name: "Sheopur", cx: 295, cy: 110, region: "North", path: "M 280 85 L 315 90 L 325 125 L 300 145 L 275 130 Z" },
  { id: "morena", name: "Morena", cx: 345, cy: 75, region: "North", path: "M 320 60 L 365 55 L 375 90 L 335 100 L 315 85 Z" },
  { id: "bhind", name: "Bhind", cx: 395, cy: 85, region: "North", path: "M 370 70 L 420 75 L 430 110 L 385 115 L 365 90 Z" },
  { id: "gwalior", name: "Gwalior", cx: 360, cy: 120, region: "North", path: "M 340 100 L 385 105 L 390 140 L 350 145 L 330 120 Z" },
  { id: "datia", name: "Datia", cx: 400, cy: 135, region: "North", path: "M 385 120 L 415 125 L 420 155 L 390 155 Z" },
  { id: "shivpuri", name: "Shivpuri", cx: 335, cy: 165, region: "North", path: "M 305 140 L 360 140 L 370 190 L 315 190 Z" },
  { id: "guna", name: "Guna", cx: 305, cy: 215, region: "North", path: "M 285 190 L 330 190 L 335 240 L 290 240 Z" },
  { id: "ashoknagar", name: "Ashoknagar", cx: 355, cy: 215, region: "North", path: "M 335 195 L 375 200 L 380 240 L 340 240 Z" },

  // Bundelkhand & North-East
  { id: "niwari", name: "Niwari", cx: 435, cy: 145, region: "East", path: "M 425 135 L 448 140 L 445 165 L 420 160 Z" },
  { id: "tikamgarh", name: "Tikamgarh", cx: 440, cy: 185, region: "East", path: "M 420 165 L 460 170 L 455 215 L 415 210 Z" },
  { id: "chhatarpur", name: "Chhatarpur", cx: 485, cy: 185, region: "East", path: "M 460 165 L 515 170 L 510 220 L 455 215 Z" },
  { id: "panna", name: "Panna", cx: 540, cy: 195, region: "East", path: "M 515 175 L 565 180 L 560 225 L 510 220 Z" },
  { id: "satna", name: "Satna", cx: 590, cy: 195, region: "East", path: "M 565 180 L 620 185 L 615 235 L 560 225 Z" },
  { id: "rewa", name: "Rewa", cx: 645, cy: 195, region: "East", path: "M 620 180 L 675 185 L 670 240 L 615 235 Z" },
  { id: "sidhi", name: "Sidhi", cx: 695, cy: 235, region: "East", path: "M 670 215 L 725 220 L 720 270 L 665 265 Z" },
  { id: "singrauli", name: "Singrauli", cx: 755, cy: 245, region: "East", path: "M 725 225 L 785 230 L 780 280 L 720 275 Z" },

  // West (Malwa)
  { id: "neemuch", name: "Neemuch", cx: 165, cy: 175, region: "West", path: "M 145 155 L 185 160 L 180 205 L 140 200 Z" },
  { id: "mandsaur", name: "Mandsaur", cx: 175, cy: 225, region: "West", path: "M 155 205 L 195 210 L 190 255 L 150 250 Z" },
  { id: "ratlam", name: "Ratlam", cx: 175, cy: 285, region: "West", path: "M 150 260 L 205 265 L 200 315 L 145 310 Z" },
  { id: "agar_malwa", name: "Agar Malwa", cx: 235, cy: 245, region: "West", path: "M 215 230 L 260 235 L 255 270 L 210 265 Z" },
  { id: "shajapur", name: "Shajapur", cx: 245, cy: 285, region: "West", path: "M 225 270 L 270 275 L 265 315 L 220 310 Z" },
  { id: "ujjain", name: "Ujjain", cx: 215, cy: 315, region: "West", path: "M 195 295 L 245 300 L 240 345 L 190 340 Z" },
  { id: "jhabua", name: "Jhabua", cx: 135, cy: 345, region: "West", path: "M 115 325 L 155 330 L 150 375 L 110 370 Z" },
  { id: "alirajpur", name: "Alirajpur", cx: 130, cy: 395, region: "West", path: "M 110 375 L 155 380 L 150 425 L 105 420 Z" },
  { id: "dhar", name: "Dhar", cx: 185, cy: 370, region: "West", path: "M 160 345 L 215 350 L 210 405 L 155 400 Z" },
  { id: "indore", name: "Indore", cx: 235, cy: 365, region: "West", path: "M 215 345 L 265 350 L 260 395 L 210 390 Z" },
  { id: "dewas", name: "Dewas", cx: 275, cy: 345, region: "West", path: "M 255 325 L 305 330 L 300 375 L 250 370 Z" },

  // Central (Bhopal & Sagar division)
  { id: "rajgarh", name: "Rajgarh", cx: 265, cy: 235, region: "Central", path: "M 245 215 L 295 220 L 290 260 L 240 255 Z" },
  { id: "vidisha", name: "Vidisha", cx: 335, cy: 275, region: "Central", path: "M 310 250 L 365 255 L 360 305 L 305 300 Z" },
  { id: "bhopal", name: "Bhopal", cx: 305, cy: 310, region: "Central", path: "M 285 290 L 330 295 L 325 335 L 280 330 Z" },
  { id: "sehore", name: "Sehore", cx: 295, cy: 350, region: "Central", path: "M 275 335 L 320 340 L 315 380 L 270 375 Z" },
  { id: "raisen", name: "Raisen", cx: 355, cy: 325, region: "Central", path: "M 330 305 L 385 310 L 380 360 L 325 355 Z" },
  { id: "sagar", name: "Sagar", cx: 415, cy: 265, region: "Central", path: "M 385 240 L 450 245 L 445 295 L 380 290 Z" },
  { id: "damoh", name: "Damoh", cx: 475, cy: 265, region: "Central", path: "M 450 245 L 505 250 L 500 300 L 445 295 Z" },
  { id: "katni", name: "Katni", cx: 545, cy: 265, region: "Central", path: "M 515 245 L 575 250 L 570 300 L 510 295 Z" },
  { id: "jabalpur", name: "Jabalpur", cx: 525, cy: 330, region: "Central", path: "M 495 305 L 560 310 L 555 365 L 490 360 Z" },
  { id: "narsinghpur", name: "Narsinghpur", cx: 445, cy: 345, region: "Central", path: "M 415 320 L 475 325 L 470 375 L 410 370 Z" },

  // South & Mahakoshal
  { id: "harda", name: "Harda", cx: 315, cy: 395, region: "South", path: "M 295 380 L 340 385 L 335 425 L 290 420 Z" },
  { id: "hoshangabad", name: "Narmadapuram", cx: 375, cy: 380, region: "South", path: "M 345 360 L 410 365 L 405 415 L 340 410 Z" },
  { id: "betul", name: "Betul", cx: 385, cy: 445, region: "South", path: "M 355 420 L 420 425 L 415 480 L 350 475 Z" },
  { id: "barwani", name: "Barwani", cx: 175, cy: 435, region: "South", path: "M 150 415 L 205 420 L 200 465 L 145 460 Z" },
  { id: "khargone", name: "Khargone", cx: 235, cy: 435, region: "South", path: "M 205 415 L 265 420 L 260 470 L 200 465 Z" },
  { id: "khandwa", name: "Khandwa", cx: 285, cy: 435, region: "South", path: "M 265 415 L 315 420 L 310 470 L 260 465 Z" },
  { id: "burhanpur", name: "Burhanpur", cx: 275, cy: 485, region: "South", path: "M 255 470 L 300 475 L 295 515 L 250 510 Z" },
  { id: "chhindwara", name: "Chhindwara", cx: 465, cy: 425, region: "South", path: "M 430 395 L 500 400 L 495 470 L 425 465 Z" },
  { id: "seoni", name: "Seoni", cx: 535, cy: 415, region: "South", path: "M 505 390 L 565 395 L 560 460 L 500 455 Z" },
  { id: "mandla", name: "Mandla", cx: 595, cy: 365, region: "South", path: "M 565 340 L 630 345 L 625 405 L 560 400 Z" },
  { id: "balaghat", name: "Balaghat", cx: 595, cy: 440, region: "South", path: "M 565 410 L 635 415 L 630 485 L 560 480 Z" },
  { id: "dindori", name: "Dindori", cx: 660, cy: 350, region: "South", path: "M 630 325 L 695 330 L 690 385 L 625 380 Z" },
  { id: "umaria", name: "Umaria", cx: 625, cy: 285, region: "South", path: "M 595 260 L 655 265 L 650 315 L 590 310 Z" },
  { id: "shahdol", name: "Shahdol", cx: 685, cy: 295, region: "South", path: "M 655 270 L 715 275 L 710 330 L 650 325 Z" },
  { id: "anuppur", name: "Anuppur", cx: 725, cy: 345, region: "South", path: "M 695 320 L 755 325 L 750 375 L 690 370 Z" }
];

// Callouts matching Image 1 exactly:
// Gwalior 78% (Good) green, top;
// Rewa 48% (At Risk) red, right-upper;
// Ujjain 72% (On Track) amber border, left;
// Bhopal 88% (Excellent) green, centre;
// Indore 91% (Excellent) green, lower-left;
// Jabalpur 64% (Needs Attention) amber, lower-centre-right.
export interface MapCallout {
  districtId: string;
  districtName: string;
  percentage: number;
  statusLabel: string;
  statusType: "On Track" | "Needs Attention" | "At Risk";
  calloutX: number;
  calloutY: number;
  targetX: number;
  targetY: number;
  lineX: number;
  lineY: number;
}

export const MP_MAP_CALLOUTS: MapCallout[] = [
  {
    districtId: "gwalior",
    districtName: "Gwalior",
    percentage: 78,
    statusLabel: "Good",
    statusType: "On Track",
    calloutX: 430,
    calloutY: 70,
    targetX: 365,
    targetY: 115,
    lineX: 430,
    lineY: 88,
  },
  {
    districtId: "rewa",
    districtName: "Rewa",
    percentage: 48,
    statusLabel: "At Risk",
    statusType: "At Risk",
    calloutX: 535,
    calloutY: 140,
    targetX: 635,
    targetY: 195,
    lineX: 595,
    lineY: 165,
  },
  {
    districtId: "ujjain",
    districtName: "Ujjain",
    percentage: 72,
    statusLabel: "On Track",
    statusType: "Needs Attention",
    calloutX: 220,
    calloutY: 200,
    targetX: 220,
    targetY: 300,
    lineX: 220,
    lineY: 235,
  },
  {
    districtId: "bhopal",
    districtName: "Bhopal",
    percentage: 88,
    statusLabel: "Excellent",
    statusType: "On Track",
    calloutX: 345,
    calloutY: 225,
    targetX: 310,
    targetY: 295,
    lineX: 345,
    lineY: 260,
  },
  {
    districtId: "indore",
    districtName: "Indore",
    percentage: 91,
    statusLabel: "Excellent",
    statusType: "On Track",
    calloutX: 215,
    calloutY: 265,
    targetX: 235,
    targetY: 355,
    lineX: 220,
    lineY: 300,
  },
  {
    districtId: "jabalpur",
    districtName: "Jabalpur",
    percentage: 64,
    statusLabel: "Needs Attention",
    statusType: "Needs Attention",
    calloutX: 435,
    calloutY: 255,
    targetX: 515,
    targetY: 320,
    lineX: 470,
    lineY: 290,
  },
];

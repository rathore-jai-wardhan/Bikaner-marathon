// Cities offered in the City dropdown, grouped by state.
//
// - The dropdown shows only the cities of the state chosen above it.
// - Every list ends with an "Other" choice, so small towns and villages
//   (and areas inside Delhi, for example) can still be typed in.
// - Each city appears once, under its commonly used official name.
// - Every state name must match lib/state.ts exactly. A test checks this.

const CITIES_BY_STATE: Record<string, string[]> = {
  Rajasthan: [
    "Bikaner", "Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer", "Alwar", "Bharatpur",
    "Bhilwara", "Sikar", "Sri Ganganagar", "Hanumangarh", "Churu", "Jhunjhunu", "Nagaur",
    "Pali", "Barmer", "Jaisalmer", "Tonk", "Chittorgarh", "Dausa", "Bundi", "Baran",
    "Jhalawar", "Sawai Madhopur", "Karauli", "Dholpur", "Banswara", "Dungarpur",
    "Rajsamand", "Sirohi", "Jalore", "Beawar", "Kishangarh", "Nokha", "Suratgarh",
    "Sujangarh", "Ratangarh", "Deshnoke", "Lunkaransar", "Pilani", "Mount Abu",
    "Abu Road", "Pushkar", "Bhiwadi", "Neemrana", "Phalodi", "Pokaran", "Kuchaman",
    "Fatehpur", "Losal", "Khajuwala", "Sri Dungargarh", "Kolayat", "Chhatargarh",
    "Raisinghnagar", "Anupgarh", "Sadulshahar", "Nohar", "Bhadra", "Rawatsar",
    "Sardarshahar", "Ladnun", "Didwana", "Merta City", "Makrana", "Sambhar", "Behror",
    "Kotputli", "Khetri", "Nawalgarh", "Mandawa", "Bhinmal", "Sanchore", "Balotra",
    "Gangapur City", "Hindaun City", "Bayana", "Ramganj Mandi", "Nathdwara", "Kankroli",
    "Sagwara",
  ],
  Delhi: ["New Delhi", "Delhi"],
  Haryana: [
    "Gurugram", "Faridabad", "Panipat", "Ambala", "Karnal", "Rohtak", "Hisar", "Sonipat",
    "Panchkula", "Yamunanagar", "Bhiwani", "Sirsa", "Rewari", "Jhajjar", "Kurukshetra",
    "Fatehabad", "Jind", "Kaithal", "Narnaul", "Palwal",
  ],
  Punjab: [
    "Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali", "Pathankot",
    "Hoshiarpur", "Moga", "Firozpur", "Kapurthala", "Sangrur", "Abohar",
  ],
  Chandigarh: ["Chandigarh"],
  "Uttar Pradesh": [
    "Lucknow", "Kanpur", "Varanasi", "Agra", "Prayagraj", "Meerut", "Ghaziabad", "Noida",
    "Greater Noida", "Bareilly", "Aligarh", "Moradabad", "Gorakhpur", "Saharanpur", "Jhansi",
    "Mathura", "Vrindavan", "Firozabad", "Muzaffarnagar", "Ayodhya", "Etawah", "Mirzapur",
    "Sultanpur", "Basti", "Shahjahanpur", "Hapur", "Raebareli", "Unnao", "Lakhimpur",
  ],
  Uttarakhand: [
    "Dehradun", "Haridwar", "Rishikesh", "Haldwani", "Roorkee", "Nainital", "Rudrapur",
    "Kashipur", "Mussoorie", "Almora",
  ],
  "Himachal Pradesh": [
    "Shimla", "Dharamshala", "Manali", "Solan", "Mandi", "Kullu", "Palampur", "Baddi",
    "Nahan", "Kangra",
  ],
  "Jammu and Kashmir": ["Srinagar", "Jammu", "Anantnag", "Baramulla", "Udhampur", "Kathua"],
  Ladakh: ["Leh", "Kargil"],
  Gujarat: [
    "Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Gandhinagar",
    "Junagadh", "Anand", "Bharuch", "Mehsana", "Morbi", "Bhuj", "Palanpur", "Navsari",
    "Vapi", "Porbandar", "Nadiad", "Surendranagar", "Gandhidham",
  ],
  Maharashtra: [
    "Mumbai", "Pune", "Thane", "Nagpur", "Nashik", "Navi Mumbai", "Chhatrapati Sambhajinagar",
    "Solapur", "Kolhapur", "Amravati", "Nanded", "Sangli", "Jalgaon", "Akola", "Latur",
    "Ahmednagar", "Satara", "Kalyan", "Vasai-Virar", "Pimpri-Chinchwad", "Dhule",
    "Chandrapur", "Ratnagiri", "Malegaon",
  ],
  Goa: ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda"],
  "Madhya Pradesh": [
    "Bhopal", "Indore", "Jabalpur", "Gwalior", "Ujjain", "Rewa", "Satna", "Ratlam", "Dewas",
    "Chhindwara", "Khandwa", "Morena", "Singrauli", "Burhanpur", "Neemuch", "Mandsaur",
    "Vidisha",
  ],
  Chhattisgarh: ["Raipur", "Bhilai", "Durg", "Korba", "Raigarh", "Jagdalpur", "Ambikapur"],
  Bihar: [
    "Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Darbhanga", "Purnia", "Arrah", "Begusarai",
    "Katihar", "Munger", "Chhapra", "Bihar Sharif", "Sasaram", "Hajipur", "Samastipur",
    "Motihari", "Siwan",
  ],
  Jharkhand: [
    "Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Deoghar", "Hazaribagh", "Giridih", "Ramgarh",
  ],
  Odisha: [
    "Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur", "Puri", "Balasore", "Bhadrak",
  ],
  "West Bengal": [
    "Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri", "Kharagpur", "Bardhaman",
    "Darjeeling", "Malda", "Haldia",
  ],
  Assam: ["Guwahati", "Dibrugarh", "Silchar", "Jorhat", "Tezpur", "Nagaon"],
  Manipur: ["Imphal"],
  Meghalaya: ["Shillong", "Tura"],
  Mizoram: ["Aizawl"],
  Nagaland: ["Kohima", "Dimapur"],
  "Arunachal Pradesh": ["Itanagar"],
  Tripura: ["Agartala"],
  Sikkim: ["Gangtok"],
  Karnataka: [
    "Bengaluru", "Mysuru", "Mangaluru", "Hubballi", "Belagavi", "Dharwad", "Kalaburagi",
    "Davangere", "Ballari", "Shivamogga", "Tumakuru", "Udupi", "Hassan",
  ],
  "Tamil Nadu": [
    "Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Erode",
    "Vellore", "Thoothukudi", "Tiruppur", "Hosur", "Thanjavur", "Kanchipuram", "Kanyakumari",
    "Nagercoil", "Karur", "Dindigul",
  ],
  Kerala: [
    "Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam", "Kannur", "Alappuzha",
    "Palakkad", "Kottayam", "Malappuram",
  ],
  Telangana: ["Hyderabad", "Secunderabad", "Warangal", "Karimnagar", "Nizamabad", "Khammam"],
  "Andhra Pradesh": [
    "Visakhapatnam", "Vijayawada", "Guntur", "Tirupati", "Nellore", "Kurnool", "Rajahmundry",
    "Kakinada", "Anantapur", "Amaravati", "Kadapa", "Eluru", "Ongole",
  ],
  Puducherry: ["Puducherry"],
  "Andaman and Nicobar Islands": ["Port Blair"],
  Lakshadweep: ["Kavaratti"],
  "Dadra and Nagar Haveli and Daman and Diu": ["Silvassa", "Daman", "Diu"],
};

// Cities shown first in their state's list (the host city of the marathon).
const PINNED: Record<string, string[]> = { Rajasthan: ["Bikaner"] };

// Value of the "Other" choice. It can never clash with a real city name.
export const OTHER_CITY_VALUE = "__other__";

// The cities to show for a state: pinned ones first, then alphabetical.
export function citiesForState(state: string): string[] {
  const all = CITIES_BY_STATE[state] ?? [];
  const pinned = PINNED[state] ?? [];
  const rest = all
    .filter((c) => !pinned.includes(c))
    .sort((a, b) => a.localeCompare(b));
  return [...pinned, ...rest];
}

export const CITIES_BY_STATE_FOR_TESTS = CITIES_BY_STATE;
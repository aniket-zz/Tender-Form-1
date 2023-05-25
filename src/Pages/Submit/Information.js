// const Details = [
//   {
//     caNumber: "V.A. & Associates",
//     udinNo: "20401781AAAACG1267",
//     companyAudited: "M/s Aaditya Construction",
//     relevantWorkExperience: {
//       year: ["2016-2017", "2017-2018", "2018-2019", "2019-2020"],
//       turnover: [
//         "174292739.00",
//         "160940092.00",
//         "203045386.00",
//         "170954252.00",
//       ],
//     },
//     workType: "Civil Work",
//   },
//   {
//     partnership: {
//       "Godawari Natural Resources Private Limited": 0.45,
//       "Deify Infrastructures Limited": 0.05,
//       "Square Cargo Movers Private Limited": 0.5,
//     },
//     lead: "Square Cargo Movers Private Limited",
//   }
// ];

const Details = {
  pan: ["ABECS3157Q", "AADCG3079K", "AAACN4276C"],
  gstin: ["22AAACN4276CIZX"],
  attorney: "Shri Sailesh Kumar Jaiswal",
  similar_work: true,
  legal: {
    JV: true,
    partners: {
      "Godawari Natural Resources Private Limited": 0.45,
      "Deify Infrastructures Limited": 0.25,
      "Square Cargo Movers Private Limited": 0.5,
    },
    lead: "Square Cargo Movers Private Limited",
  },
  dsc: "Mr. Sallesh Kumar Jaiswal",
  workcap: 63590000000.0,
  ca_name: "V.A. & Associates",
  udin: "20401781AAAACG1267",
  company_audited: "M/s Aaditya Construction",
  type_of_work: "Civil Work",
  relevent_work_experience: [
    { "Financial Year": "2016-2017", "Gross Turn Over": 17429273900.0 },
    { "Financial Year": "2017-2018", "Gross Turn Over": 160940092.0 },
    { "Financial Year": "2018-2019", "Gross Turn Over": 20304538600.0 },
    { "Financial Year": "2019-2020", "Gross Turn Over": 170954252.0 },
  ],
}

export default Details;

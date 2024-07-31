import SummaryCard from "@/components/Jobs/view/SummaryCard"

const job =
{
  logo: "/assets/temporary/pizzaHut.jpg",
  title: "Executive - Maintenance",
  company: "PizzaHut Sri Lanka",
  location: "Colombo, Western Province",
  type: "Full-Time",
  daysLeft: "8 days left",
  overview: "BSc in Engineering with at least 5 years of experience or HND/NDES/NDT with at least 10 years of experience in Mechanical/Electrical/Mechatronic fields. Please refer to the job advert for further information.",
  description: <div className="jobviewDescription">
    <div><font size="3">Gamma Pizzakraft Lanka (Pvt) Ltd is the single franchisee for Pizza Hut and Taco Bell in
      Sri Lanka with a spread of over 100+ outlets and a human capital of over 2500+ individuals. In line with
      our upcoming expansions, we are in look out for passionate individuals to join the Commissary Team.</font>
    </div>
    <div><font size="3"><br /></font></div>
    <div><b><font size="5">Executive - Maintenance</font></b></div>
    <div><font size="3"><br /></font></div>
    <div><font size="3"><b>Job Profile</b></font></div>
    <div>
      <ul className={"list-disc"}>
        <li><font size="3">Plan and execute preventive and corrective maintenance of premises, plant, and
          machinery with minimum supervision.</font></li>
        <li><font size="3">Liaise with external parties.</font></li>
        <li><font size="3">Maintain spare parts stock records.</font></li>
        <li><font size="3">Handle insurance processes.</font></li>
        <li><font size="3">Maintain records of all maintenance work.</font></li>
        <li><font size="3">Prepare work rosters and schedule subordinates.</font></li>
        <li><font size="3">Work under high factory safety conditions</font></li>
      </ul>
    </div>
    <div><font size="3"><br /></font></div>
    <div><font size="3"><b>Candidate Profile</b></font></div>
    <div>
      <ul className={"list-disc"}>
        <li><font size="3">BSc in Engineering with at least 5 years of experience or HND/NDES/NDT with at
          least 10 years of experience in Mechanical/Electrical/Mechatronic fields.</font></li>
        <li><font size="3">Candidate should be below 30 years of age.</font></li>
        <li><font size="3">Experience in a food production facility at a supervisory level would be an added
          advantage.</font></li>
        <li><font size="3">Sound knowledge of mechanical, electrical, and refrigeration systems.</font></li>
        <li><font size="3">Knowledge of networking, CCTV, and computer software is an additional
          qualification.</font></li>
        <li><font size="3">Willingness to work extended hours when required.</font></li>
        <li><font size="3">Strong leadership and analytical skills.</font></li>
        <li><font size="3">Excellent written and verbal communication skills in English and Sinhala.</font>
        </li>
      </ul>
    </div>
    <div><font size="3"><br /></font></div>
    <div><b ><font size="5">PLEASE CLICK THE APPLY BUTTON TO SEND YOUR CV VIA RecruitEase&nbsp;</font></b>
    </div>
  </div>,
  education: "Bachelor's Degree",
  experience: "5 Years",

};

export default function Home() {
  return (
    <div className="min-h-screen  py-6 flex flex-col justify-center sm:py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between">
          <div className="lg:w-2/3 bg-fill p-6 rounded-lg  mb-6 lg:mb-0">
            <div className="bg-recruitBlue p-4 rounded-t-lg text-white">
              <h1 className="text-3xl font-bold">{job.title}</h1>
              <p className="mt-2">{job.company}</p>
            </div>
            <div className="p-4 text-primaryText">
              <h3 className="text-lg font-bold mb-2">Overview</h3>
              {job.description}
              <div className="flex space-x-4">
                <button className="bg-green-500 text-white px-4 py-2 rounded">Apply for Job</button>
                <button className="bg-white text-gray-800 px-4 py-2 rounded border border-gray-300">Save
                  Job
                </button>
              </div>
            </div>
          </div>
          <div className="lg:w-1/3">
            <SummaryCard job={job} />

          </div>
        </div>
      </div>
    </div>
  )
}

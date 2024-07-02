import SummaryCard from "@/components/Jobs/view/SummaryCard"

export default function Home() {
  return (
    <div className="min-h-screen  py-6 flex flex-col justify-center sm:py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between">
          <div className="lg:w-2/3 bg-fill p-6 rounded-lg  mb-6 lg:mb-0">
            <div className="bg-recruitBlue p-4 rounded-t-lg text-white">
              <h1 className="text-3xl font-bold">Medical Marketing Executive (Male/Female)</h1>
              <p className="mt-2">MIOT Hospital Information Centre Sri Lanka</p>
            </div>
            <div className="p-4 text-primaryText">
              <h2 className="text-xl font-bold mb-4">Medical Marketing Executive (Male/Female)</h2>
              <p className="mb-4">
                MIOT International, located in Chennai, India, is a leading multi-specialty hospital renowned for its state-of-the-art facilities and commitment to excellence in patient care. Established in 1999, MIOT stands for Madras Institute of Orthopedics and Traumatology but has since expanded to offer comprehensive medical services across various specialties. The hospital is known for its advanced medical technology, highly skilled healthcare professionals, and a patient-centric approach, making it a preferred choice for patients from India and around the world.
              </p>
              <h3 className="text-lg font-bold mb-2">Job Summary</h3>
              <p className="mb-4">
                MIOT Hospital is seeking a highly skilled and motivated Medical Marketing Executive to join our dynamic team. This role will focus on developing and implementing innovative marketing strategies to enhance our brand presence and drive patient engagement.
              </p>
              <div className="flex space-x-4">
                <button className="bg-green-500 text-white px-4 py-2 rounded">Apply for Job</button>
                <button className="bg-white text-gray-800 px-4 py-2 rounded border border-gray-300">Save Job</button>
              </div>
            </div>
          </div>
          <div className="lg:w-1/3">
            <SummaryCard />
            
          </div>
        </div>
      </div>
    </div>
  )
}

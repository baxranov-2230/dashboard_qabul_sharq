import React from "react";

function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Statistics Cards */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          O'quv reja bajarilishi
        </h3>
        <div className="flex items-end space-x-4">
          <div className="text-3xl font-bold text-[#2557A7]">87%</div>
          <div className="text-sm text-gray-500">4-semestr</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          O'zlashtirish ko'rsatkichi
        </h3>
        <div className="flex items-end space-x-4">
          <div className="text-3xl font-bold text-green-600">92%</div>
          <div className="text-sm text-gray-500">2023-2024</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Davomat</h3>
        <div className="flex items-end space-x-4">
          <div className="text-3xl font-bold text-yellow-600">95%</div>
          <div className="text-sm text-gray-500">Mart, 2024</div>
        </div>
      </div>

      {/* Schedule Card */}
      <div className="bg-white rounded-lg shadow p-6 md:col-span-2">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Bugungi dars jadvali
        </h3>
        <div className="space-y-4">
          {[
            {
              time: "08:30 - 09:50",
              subject: "Dasturlash asoslari",
              type: "Amaliy",
              room: "214-xona",
            },
            {
              time: "10:00 - 11:20",
              subject: "Ma'lumotlar bazasi",
              type: "Ma'ruza",
              room: "306-xona",
            },
            {
              time: "11:30 - 12:50",
              subject: "Web dasturlash",
              type: "Laboratoriya",
              room: "103-xona",
            },
          ].map((lesson, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className="text-sm font-medium text-gray-600">
                  {lesson.time}
                </div>
                <div>
                  <div className="font-medium text-gray-800">
                    {lesson.subject}
                  </div>
                  <div className="text-sm text-gray-500">
                    {lesson.type} • {lesson.room}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Announcements Card */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">E'lonlar</h3>
        <div className="space-y-4">
          {[
            {
              title: "Imtihon jadvali",
              date: "15.03.2024",
              description: "Yakuniy nazorat imtihonlari jadvali e'lon qilindi",
            },
            {
              title: "Stipendiya to'lovi",
              date: "12.03.2024",
              description:
                "Mart oyi uchun stipendiya to'lovlari amalga oshirildi",
            },
          ].map((announcement, index) => (
            <div
              key={index}
              className="border-b pb-4 last:border-b-0 last:pb-0"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-gray-800">
                  {announcement.title}
                </h4>
                <span className="text-sm text-gray-500">
                  {announcement.date}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                {announcement.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

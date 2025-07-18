import React from "react";
import { useLanguage } from "../context/LanguageContext";

function Subjects() {
  const { t } = useLanguage();

  const subjects = [
    {
      name: "Web dasturlash",
      code: "WEB301",
      credits: 6,
      type: "Majburiy",
      teacher: "Abdullayev A.A.",
      semester: 4,
    },
    {
      name: "Ma'lumotlar bazasi",
      code: "DB201",
      credits: 4,
      type: "Majburiy",
      teacher: "Karimov K.K.",
      semester: 4,
    },
    {
      name: "Dasturlash asoslari",
      code: "PRG101",
      credits: 5,
      type: "Majburiy",
      teacher: "Toshmatov T.T.",
      semester: 4,
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">{t("menu.subjects")}</h2>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4">
          <table className="w-full">
            <thead>
              <tr className="text-left bg-gray-50">
                <th className="p-3 text-gray-600">Fan nomi</th>
                <th className="p-3 text-gray-600">Kod</th>
                <th className="p-3 text-gray-600">Kredit</th>
                <th className="p-3 text-gray-600">Turi</th>
                <th className="p-3 text-gray-600">O'qituvchi</th>
                <th className="p-3 text-gray-600">Semestr</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject, index) => (
                <tr key={index} className="border-t">
                  <td className="p-3 font-medium">{subject.name}</td>
                  <td className="p-3">{subject.code}</td>
                  <td className="p-3">{subject.credits}</td>
                  <td className="p-3">{subject.type}</td>
                  <td className="p-3">{subject.teacher}</td>
                  <td className="p-3">
                    {subject.semester}-{t("dashboard.semester")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Subjects;

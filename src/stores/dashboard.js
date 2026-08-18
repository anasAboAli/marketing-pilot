import { defineStore } from "pinia";

export const useDashboardStore = defineStore("dashboard", {
  state: () => ({
    statistics: [
      {
        title: "إجمالي الإيرادات",
        value: "48,250 ر.س",
        change: "+12.4%",
        changeType: "success",
      },
      {
        title: "الحملات النشطة",
        value: "24",
        change: "نشطة",
        changeType: "info",
      },
      {
        title: "العملاء المحتملون",
        value: "1,284",
        change: "+8.3%",
        changeType: "success",
      },
      {
        title: "معدل التحويل",
        value: "6.8%",
        change: "-1.1%",
        changeType: "danger",
      },
    ],

    recentLeads: [
      {
        name: "أحمد محمد",
        company: "شركة الريادة العقارية",
        status: "جديد",
        value: "2,500 ر.س",
      },
      {
        name: "سارة خالد",
        company: "عيادات النخبة",
        status: "مؤهل",
        value: "1,800 ر.س",
      },
      {
        name: "محمد علي",
        company: "متجر الأناقة",
        status: "تم التواصل",
        value: "3,200 ر.س",
      },
      {
        name: "لينا يوسف",
        company: "شركة السفر الذكي",
        status: "تم التعاقد",
        value: "5,400 ر.س",
      },
    ],

    activities: [
      {
        title: "تم إنشاء حملة إعلانية جديدة",
        time: "منذ 5 دقائق",
      },
      {
        title: "تم تعيين عميل محتمل إلى أحمد",
        time: "منذ 20 دقيقة",
      },
      {
        title: "تم إيقاف حملة فيسبوك مؤقتًا",
        time: "منذ ساعة",
      },
      {
        title: "تم تصدير التقرير الشهري",
        time: "أمس",
      },
    ],
  }),
});
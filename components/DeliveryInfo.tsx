export default function DeliveryInfo() {
    return (
      <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-8 max-w-4xl mx-auto my-12">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="bg-neutral-800 p-4 rounded-full text-amber-500">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
            </svg>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-neutral-100 mb-2">משלוחי אקספרס ודיסקרטיות מלאה</h3>
            <p className="text-neutral-400 leading-relaxed">
              מערך המשלוחים שלנו מגיע לכל נקודה בישראל באריזות אטומות. 
              אנו מפעילים קווי חלוקה מהירים מאזור פרדס חנה-כרכור והשרון, ועד אילת, כדי להבטיח שהשמן שלך יגיע בטוח ומהר.
            </p>
          </div>
        </div>
      </div>
    );
  }
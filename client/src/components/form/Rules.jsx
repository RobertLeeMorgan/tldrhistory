export default function Rules() {
  return (
    <dialog id="my_modal_2" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Rules</h3>
        <p className="py-2">
          Strong language is allowed, but remain impartial and be respectful of
          other cultures.
        </p>
        <p className="py-2">Search database before creating an article.</p>
        <p className="py-2">
          Nobody wants to read the entire British Monarchy lineage, only create
          noteworthy articles.
        </p>
        <p className="py-2">
          Use the most widely accepted theory for anything debatable.
        </p>
        <p className="py-2">Names in full, in English.</p>
        <p className="py-2">Events are under 100 years, Periods are 100+.</p>
        <p className="py-2">
          Start year is the only requirement for dates, anything that is unknown
          leave blank or enter 0.
        </p>
        <p className="py-2">
          Use modern day equivalents for location, e.g. Persia = Iran.
        </p>
        <p className="py-2">
          Culture covers art, music, religion, civilizations. Intellectual
          covers science, philosophy, literature. Military covers war, battles,
          weaponary. Politics covers government, monarchy, dynasty.
        </p>
        <p className="py-2">For now we only go as far as the 19th Century.</p>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

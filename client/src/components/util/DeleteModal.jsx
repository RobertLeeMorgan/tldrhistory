export default function DeleteModal({ handleDelete, isPending, id }) {
  return (
    <dialog id={`my_modal_${id}`} className='modal z-50'>
      <div className='modal-box'>
        <h3 className="font-bold text-lg">Delete</h3>
        <p className="py-4">
          Are you sure you would like to delete this article? 
        </p>
        <div className="modal-action">
          {isPending ? (
            <button className="btn">
              <span className="loading loading-spinner"></span>
              Deleting
            </button>
          ) : (
            <button className="btn btn-secondary" onClick={() => handleDelete(id)}>
              Delete
            </button>
          )}
          <form method="dialog">
            <button className="btn">Cancel</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}

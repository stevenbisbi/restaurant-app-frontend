import { Link } from "react-router-dom";
export function HeaderAdmin(props) {
  const { title, btnTitle, endPoint } = props;
  return (
    (document.title = title),
    (
      <header>
        <h1 className="text-center py-3">{title}</h1>
        <div className="d-flex justify-content-end">
          {btnTitle && (
            <Link to={endPoint} className="btn btn-success mb-3">
              {btnTitle}
            </Link>
          )}
        </div>
      </header>
    )
  );
}

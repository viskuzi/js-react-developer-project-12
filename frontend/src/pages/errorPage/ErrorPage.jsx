import style from './ErrorPage.module.scss';
import sadSmileImg from '../../assets/images/Sad_Smile.png'

export function Error() {
  return (
    <div className={style.container}>
      <img src={sadSmileImg} style={{width: "100px", height: "100px"}} alt="ErrorPicture" />
      <h1>Error 404</h1>
      <h2>Page is not found</h2>
    </div>
  );
}
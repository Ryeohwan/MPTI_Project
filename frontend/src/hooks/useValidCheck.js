import { useReducer } from "react";

export default function useValidCheck(initialInput) {
  let pattern_kor = /^[가-힣]{2,15}$/; // 한글

  const reducer = (state, action) => {
    const alertList = [];
    alertList.push(action.value)
    switch (action.type) {
      case "NAME":
        if (action.value === "")
          return (
            <span>필수 입력 항목입니다.</span>
            
          );
        if (action.value.length > 6)
          alertList.push(
            <span>
              이름이 6글자가 넘었읍니다.
            </span>
          );
        // return <span className={styles.signup_unvalid}>이름이 15글자가 넘었읍니다.</span>
        // return <span className={styles.signup_unvalid}>이름을 적어주세요.</span>
        if (!pattern_kor.test(action.value))
          alertList.push(
            <span>
              한글이 아닌 이름을 사용했습니다.
            </span>
          );
        // if(alertList ===[]){
        //   return null;
        // }
        return alertList;
      case "GENDER":
        return null;
      case "ID":
        return null;
      case "PW":
        return null;
      case "PW2":
        return null;
      case "BIRTH":
        return null;
      case "PHONE":
        return null;
      case "PRIZE":
        return null;
      case "CERT":
        return null;
      case "RESUME":
        return null;
      default:
        return null;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialInput);

  return [state, dispatch];
}

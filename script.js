const profilePhoto = document.querySelector(".profile-photo");

profilePhoto.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

// const sections = document.querySelectorAll(".right_container section");

// sections.forEach((section, index) => {
//     section.style.display = index === 0 ? "flex" : "none";
// });

// for(let index=0; index < sections.length; index++) {
//     const section = sections[index];
//     section.addEventListener('click', function(event) {
//         const sectionWidth = section.offsetWidth;

//         const clickX = event.clientX - section.getBoundingClientRect().left;

//         if (clickX < sectionWidth/2) {
//             if (index != 0) {
//                 section.style.display="none";
//                 sections[index-1].style.display = "flex";
//             }
//         }
//         else {
//             if (index != (section.length-1)) {
//                 section.style.display = "none";
//                 sections[index+1].style.display = "flex";
//             }
//         }
//     });
// }

/* 함수화 */
const sections = document.querySelectorAll(".right_container section");
let currentIndex = 0;

sections.forEach((section, index) => {
  section.style.display = index === 0 ? "flex" : "none";
});

const showAfterSection = () => {
    sections.forEach((section) => { section.style.display = 'none'; })  // 현재 section 숨기기
    if (currentIndex == sections.length - 1) {
        currentIndex = 0;
    } else {
        currentIndex++;
    }
    sections[currentIndex].style.display = 'flex';  // 다음 section 보여주기
}
const showBeforeSection = () => {
    sections.forEach((section) => { section.style.display = 'none'; })
    if (currentIndex == 0) {
        currentIndex = sections.length - 1;
    } else {
        currentIndex--;
    }
    sections[currentIndex].style.display = 'flex';
}

// 실행되는 인터벌의 고유 ID를 반환 -> intervalId로 저장
// showAfterSection이라는 함수를 3초마다 반복 실행
let intervalId = setInterval(showAfterSection, 3000);

const resetInterval = () => {
    // 현재 실행 중인 인터벌(intervalId)을 중단
    // 지정된 ID와 연결된 setInterval 작업 중단
    // 현재 실행 중인 인터벌만 취소하는 역할을 수행하므로, 새로운 인터벌을 생성하거나 재시작하지 않음 -> 새로운 setInterval 필요
    clearInterval(intervalId);
    // 새롭게 intervalID를 저장함으로써 이전 인터벌은 중단되고, 새로운 3초 주기의 인터벌 시작
    intervalId = setInterval(showAfterSection, 3000);
}

sections.forEach((section, index) => {
    section.addEventListener("click", (event) => {
        const sectionWidth = section.offsetWidth;
        const clickX = event.clientX - section.getBoundingClientRect().left;

        if (clickX < sectionWidth / 3) {  // 왼쪽 1/3 클릭 시 이전 section으로 이동
            showBeforeSection();
            resetInterval();
        } else if (clickX > sectionWidth * 2 / 3) {  // 오른쪽 1/3 클릭 시 다음 section으로 이동
            showAfterSection();
            resetInterval();
        } else {  // 중간 1/3 클릭 시 자동 넘김 토글
            if (intervalId) {
                clearInterval(intervalId);  // 자동 넘김 중지
                // intervalId 값은 여전히 남아있으므로 null 값을 넣어줌으로써 더 이상 유효하지 않게 함
                intervalId = null;
            } else {
                intervalId = setInterval(showAfterSection, 3000);  // 자동 넘김 재개
            }
        }
    });
});
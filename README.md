# file-watcher-client
파일 변경 감시 클라이언트

서버의 파일이 변경될 시 브라우저를 새로고침 합니다.
file-watcher-server와 함께 연동하여 사용할 수 있습니다.

## 설치방법

폴더에 다운로드 받아서 크롬 확장프로그램에 등록하시면 됩니다.

서버 소켓 URL : [file-watcher-server의 IP]:16949/watch
서버 도메인 : 새로고침 할 페이지의 도메인
서버 디렉토리 : 변경이 발생하게 될 디렉토리

## 예시

로컬에서 프로젝트 진행 시

1. 로컬에서 file-watcher-server 실행

2. file-watcher-client를 크롬 확장프로그램으로 등록

3. 확장프로그램을 실행하여 아래값으로 설정
서버 소켓 URL : localhost:16949/watch
서버 도메인 : localhost:8080
서버 디렉토리 : D:\Projects\BusyProject

4. 연결하기

이후부터는 D:\Projects\BusyProject 하위의 파일이 변경될 시 자동으로 새로고침이 됩니다.

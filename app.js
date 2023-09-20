Ext.application({
    name: 'MyApp', // 애플리케이션의 이름

    extend: 'MyApp.Application', // 애플리케이션 클래스 (MyApp/Application.js)

    requires: [
        // 필요한 ExtJS 클래스나 모듈을 여기에 추가
    ],

    launch: function () {
        // 애플리케이션이 시작될 때 실행될 코드
        Ext.create('MyApp.view.Main'); // Main 뷰를 생성하고 렌더링

        // 기타 초기화 작업을 수행할 수 있습니다.
    }
});

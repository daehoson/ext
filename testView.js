Ext.onReady(function() {
    var gridStore = Ext.create('Ext.data.Store', {
        fields: ['title', 'author', 'date'],
        data: [
            { title: '게시물 1', author: '작성자 1', date: '2023-06-30' },
            { title: '게시물 2', author: '작성자 2', date: '2023-07-01' },
            { title: '게시물 3', author: '작성자 3', date: '2023-07-01' },
            { title: '게시물 4', author: '작성자 4', date: '2023-07-01' },
            { title: '게시물 5', author: '작성자 5', date: '2023-07-01' },
            { title: '게시물 6', author: '작성자 2', date: '2023-07-01' }
        ]
    });

    var gridStore2 = Ext.create('Ext.data.Store', {
        fields: ['title', 'author', 'date'],
        pageSize: 10, // 페이지 크기 설정
        data: [
            { title: '게시물 11', author: '작성자 1', date: '2023-06-30' },
            { title: '게시물 12', author: '작성자 2', date: '2023-07-01' },
            { title: '게시물 13', author: '작성자 3', date: '2023-07-01' }
        ]
    });
    var pageSize = 100;

    var gridStore3 = Ext.create('Ext.data.Store', {
        fields: ['title', 'author', 'date'],
        pageSize: pageSize,
        proxy: {
            type: 'memory',
            enablePaging: true
        },
        data: [
            { NM: '손대호',	MBTLNUM: '01026496108',	MESURE_CODE: '4040',
            	MESURE_BGNDT: '20230806222608',	MESURE_ENDDT: '20230807062508',
                AWAKE_SLEEP_TIME: '9',	LIGHT_SLEEP_TIME: '271',	DEEP_SLEEP_TIME: '129',
                REM_SLEEP_TIME:'70',	TOTAL:'479'
            },
            { NM: '손대호',	MBTLNUM: '01026496108',	MESURE_CODE: '4040',
            	MESURE_BGNDT: '20230805222608',	MESURE_ENDDT: '20230806062508',
                AWAKE_SLEEP_TIME: '9',	LIGHT_SLEEP_TIME: '271',	DEEP_SLEEP_TIME: '129',
                REM_SLEEP_TIME:'70',	TOTAL:'479'
            },
            { NM: '손대호',	MBTLNUM: '01026496108',	MESURE_CODE: '4040',
            	MESURE_BGNDT: '20230806222608',	MESURE_ENDDT: '20230807062508',
                AWAKE_SLEEP_TIME: '9',	LIGHT_SLEEP_TIME: '271',	DEEP_SLEEP_TIME: '129',
                REM_SLEEP_TIME:'70',	TOTAL:'479'
            },
            { NM: '손대호',	MBTLNUM: '01026496108',	MESURE_CODE: '4040',
            	MESURE_BGNDT: '20230805222608',	MESURE_ENDDT: '20230806062508',
                AWAKE_SLEEP_TIME: '9',	LIGHT_SLEEP_TIME: '271',	DEEP_SLEEP_TIME: '129',
                REM_SLEEP_TIME:'70',	TOTAL:'479'
            },
            { NM: '손대호',	MBTLNUM: '01026496107',	MESURE_CODE: '4040',
            	MESURE_BGNDT: '20230807222608',	MESURE_ENDDT: '20230808062508',
                AWAKE_SLEEP_TIME: '9',	LIGHT_SLEEP_TIME: '271',	DEEP_SLEEP_TIME: '129',
                REM_SLEEP_TIME:'70',	TOTAL:'479'
            },
            { NM: '손대호',	MBTLNUM: '01026496107',	MESURE_CODE: '4040',
            	MESURE_BGNDT: '20230808222608',	MESURE_ENDDT: '20230809062508',
                AWAKE_SLEEP_TIME: '9',	LIGHT_SLEEP_TIME: '271',	DEEP_SLEEP_TIME: '129',
                REM_SLEEP_TIME:'70',	TOTAL:'479'
            }
        ]
    });

    var gridStore3_filtered = Ext.create('Ext.data.Store', {
        fields: ['title', 'author', 'date'],
        pageSize: pageSize,
        proxy: {
            type: 'memory',
            enablePaging: false
        },
        data: [
        ]
    });

    // 메뉴 버튼 핸들러
    var menuButtonClickHandler = function(btn) {
        var text = btn.getText();
        var content = '';

        // 메뉴 버튼에 따른 내용 설정
        if (text === 'Menu 1') {
            content = '메뉴 1 내용';
        } else if (text === 'Menu 2') {
            content = '메뉴 2 내용';
        } else if (text === 'Menu 3') {
            content = '메뉴 3 내용';
        }

        if(text === 'pagesize'){
            pageSize = 25;
        }

        // 상단 레이아웃에 내용 표시
        upperPanel.update(content);
    };

    // 메뉴 버튼
    var button1 = Ext.create('Ext.button.Button', {
        text: 'Menu 1',
        handler: menuButtonClickHandler
    });

    var button2 = Ext.create('Ext.button.Button', {
        text: 'Menu 2',
        handler: menuButtonClickHandler
    });

    var idArray = ['AWAKE_SLEEP_TIME','LIGHT_SLEEP_TIME','DEEP_SLEEP_TIME','REM_SLEEP_TIME','TOTAL'];
    var originalData = []; // 원래 데이터 저장할 배열
    // 데이터 스토어의 초기 상태를 originalData 배열에 복사
    gridStore3.each(function (record) {
        var originalRecordData = {};
        for (var i = 0; i < idArray.length; i++) {
            var fieldName = idArray[i];
            originalRecordData[fieldName] = record.get(fieldName);
        }
        originalData.push(originalRecordData);
    });

    var convertTimeButton = Ext.create('Ext.button.Button', {
        text: '시간 단위로 변환',
        renderTo: Ext.getBody(),
        handler: function () {
            // 데이터 스토어의 각 레코드를 반복하여 분을 시간으로 변환
            gridStore3.each(function (record) {
                for(var i=0;  i<idArray.length; i++){
                    var minutes = record.get(idArray[i]);
                    var hours = Math.floor(minutes / 60);
                    var remainderMinutes = minutes % 60;
                    var formattedTime = hours + '시간 ' + remainderMinutes + '분';
                    record.set(idArray[i], formattedTime);
                }
            });
        }
    });
    // "되돌리기" 버튼 생성
    var resetButton = Ext.create('Ext.button.Button', {
        text: '되돌리기',
        renderTo: Ext.getBody(),
        handler: function () {
            // originalData 배열에 저장된 원래 데이터로 스토어 복원
            gridStore3.each(function (record, index) {
                var originalRecordData = originalData[index];
                for (var i = 0; i < idArray.length; i++) {
                    var fieldName = idArray[i];
                    record.set(fieldName, originalRecordData[fieldName]);
                }
            });
        }
    });

    // 상단 레이아웃
    var topPanel = Ext.create('Ext.panel.Panel', {
        region: 'north',
        height: 50,
        layout: {
            type: 'hbox',
            pack: 'start',
            align: 'middle'
        },
        items: [
            {
                xtype: 'component',
                html: '<h1>My Application</h1>',
                margin: '0 20'
            },
            {
                xtype: 'container',
                layout: 'hbox',
                items: [button1, button2, convertTimeButton, resetButton]
            }
        ]
    });

    // 메뉴 트리
    var menuTree = Ext.create('Ext.tree.Panel', {
        region: 'west',
        width: 200,
        split: true,
        collapsible: true,
        title: '사이드 메뉴',
        store: Ext.create('Ext.data.TreeStore', {
            root: {
                text: '관리용 메뉴',
                expanded: true,
                children: [
                    {
                        id: 1,
                        text: '전북대 측정데이터 조회',
                        leaf: true
                    },
                    {
                        id: 2,
                        text: '월말 예산 할당',
                        leaf: true
                    },
                    {
                        id: 3,
                        text: '헬스맥스 캐쉬 관리',
                        leaf: true
                    },
                    {
                        id: 4,
                        text: '메뉴관리',
                        leaf: false, // 여기서는 폴더(노드)로 표시
                        children: [
                            {
                                id: 5,
                                text: '메뉴설정',
                                leaf: true
                            },
                            {
                                id: 6,
                                text: '권한설정',
                                leaf: true
                            },
                            {
                                id: 7,
                                text: '환경설정',
                                leaf: true
                            }
                        ]
                    }
                ]
            }
        }),
        listeners: {
            itemclick: function(tree, record) {
                var text = record.get('text');
                var id = record.get('id');
                var content = '';

                // 메뉴 아이템에 따른 내용 설정
                if (id === 1) {
                    // content = '메뉴 1 내용';
                    middlePanel.removeAll();
                    bottomPanel.removeAll();

                    if (middlePanel.items.length === 0) {
                        middlePanel.add(Ext.create('Ext.grid.Panel', {
                            store: gridStore3,
                            columns: [
                                { text: '이름', dataIndex: 'NM', width: 100 },
                                { text: '핸드폰번호', dataIndex: 'MBTLNUM', width: 100 },
                                { text: '측정코드', dataIndex: 'MESURE_CODE', width: 100 },
                                { text: '시작시간', dataIndex: 'MESURE_BGNDT', width: 170,        
                                    renderer: function (value) {
                                        // Format the date and time (assuming 'value' is in YYYYMMDDHHmmss format)
                                        return Ext.Date.format(Ext.Date.parse(value, 'YmdHis'), 'Y-m-d H:i:s');
                                    }
                                },
                                { text: '끝난시간', dataIndex: 'MESURE_ENDDT', width: 170,        
                                    renderer: function (value) {
                                        // Format the date and time (assuming 'value' is in YYYYMMDDHHmmss format)
                                        return Ext.Date.format(Ext.Date.parse(value, 'YmdHis'), 'Y-m-d H:i:s');
                                    }
                                },
                                { text: '깬 수면시간', dataIndex: 'AWAKE_SLEEP_TIME', width: 100 },
                                { text: '얕은 수면시간', dataIndex: 'LIGHT_SLEEP_TIME', width: 100 },
                                { text: '깊은 수면시간', dataIndex: 'DEEP_SLEEP_TIME', width: 100 },
                                { text: '램 수면시간', dataIndex: 'REM_SLEEP_TIME', width: 100 },
                                { text: '총 수면시간', dataIndex: 'TOTAL', width: 100 }
                            ],
                            bbar: {
                                xtype: 'pagingtoolbar',
                                store: gridStore3,
                                // displayInfo: true,
                                // displayMsg: 'Displaying {0} - {1} of {2}',
                                // emptyMsg: 'No data to display',
                                // pageSize: 10, // 페이지당 아이템 수를 10으로 설정
                                items:[
                                    {
                                        xtype: 'button',
                                        text: '엑셀로 내보내기',
                                        handler: function () {
                                            var modifiedData = gridStore3.getData().items.map(function (record) {
                                                return {
                                                    NM: record.get('NM'),
                                                    MBTLNUM: record.get('MBTLNUM'),
                                                    MESURE_CODE: record.get('MESURE_CODE'),
                                                    MESURE_BGNDT: Ext.Date.format(Ext.Date.parse(record.get('MESURE_BGNDT'), 'YmdHis'), 'Y-m-d H:i:s'),
                                                    MESURE_ENDDT: Ext.Date.format(Ext.Date.parse(record.get('MESURE_ENDDT'), 'YmdHis'), 'Y-m-d H:i:s'),
                                                    AWAKE_SLEEP_TIME: record.get('AWAKE_SLEEP_TIME'),
                                                    LIGHT_SLEEP_TIME: record.get('LIGHT_SLEEP_TIME'),
                                                    DEEP_SLEEP_TIME: record.get('DEEP_SLEEP_TIME'),
                                                    REM_SLEEP_TIME: record.get('REM_SLEEP_TIME'),
                                                    TOTAL: record.get('TOTAL')
                                                };
                                            });
                                            var worksheet = XLSX.utils.json_to_sheet(modifiedData);

                                            // Create a workbook and add the worksheet to it
                                            var workbook = XLSX.utils.book_new();
                                            XLSX.utils.book_append_sheet(workbook, worksheet, 'Grid Data');

                                            // Save the workbook as an Excel file
                                            XLSX.writeFile(workbook, 'grid_data.xlsx');
                                        }
                                    },
                                    '->', // 우측 정렬을 위한 패딩
                                    {
                                        xtype: 'datefield',
                                        fieldLabel: '시작 날짜',
                                        labelWidth: 80,
                                        emptyText: '날짜 선택',
                                        format: 'Y-m-d', // 날짜 형식,
                                        editable: false,
                                        id: 'startDateField',
                                        listeners: {
                                            select: function (field, date) {
                                                var endDateField = Ext.getCmp('endDateField');
                                                var endDate = endDateField.getValue();
                                                if (endDate && date > endDate) {
                                                    Ext.Msg.alert('Error', '시작 날짜는 종료 날짜보다 이전이어야 합니다.');
                                                    field.reset();
                                                    return;
                                                }
                                                gridStore3.clearFilter(true);
                                                gridStore3.filterBy(function (record) {
                                                    var measureStartDate = Ext.Date.format(Ext.Date.parse(record.get('MESURE_ENDDT'), 'YmdHis'), 'Y-m-d');
                                                    return measureStartDate >= Ext.Date.format(date, 'Y-m-d');
                                                });
                                                updateDataCount(); // 데이터 수 업데이트
                                            },
                                            clear: function () {
                                                // 필터 클리어
                                                gridStore3.clearFilter();
                                                updateDataCount(); // 데이터 수 업데이트
                                            }
                                        }
                                    },
                                    {
                                        xtype: 'datefield',
                                        fieldLabel: '종료 날짜',
                                        labelWidth: 80,
                                        emptyText: '날짜 선택',
                                        format: 'Y-m-d', // 날짜 형식,
                                        editable: false,
                                        id: 'endDateField',
                                        listeners: {
                                            select: function (field, date) {
                                                var startDateField = Ext.getCmp('startDateField');
                                                console.log(startDateField);
                                                var startDate = startDateField.getValue();
                                                if (startDate && date < startDate) {
                                                    Ext.Msg.alert('Error', '종료 날짜는 시작 날짜보다 이후이어야 합니다.');
                                                    field.reset();
                                                    return;
                                                }
                                                gridStore3.clearFilter(true);
                                                gridStore3.filterBy(function (record) {
                                                    var measureEndDate = Ext.Date.format(Ext.Date.parse(record.get('MESURE_BGNDT'), 'YmdHis'), 'Y-m-d');
                                                    return measureEndDate <= Ext.Date.format(date, 'Y-m-d');
                                                });
                                                updateDataCount(); // 데이터 수 업데이트
                                            },
                                            clear: function () {
                                                // 필터 클리어
                                                gridStore3.clearFilter();
                                                updateDataCount(); // 데이터 수 업데이트
                                            }
                                        }
                                    },
                                    {
                                        xtype: 'label',
                                        text: '조회된 데이터 수: 0', // 초기 값
                                        id: 'dataCountLabel' // 레이블의 ID
                                    },
                                    {
                                        xtype: 'textfield',
                                        fieldLabel: '핸드폰 번호 검색',
                                        labelWidth: 110,
                                        emptyText: '핸드폰 번호 입력',
                                        listeners: {
                                            change: function (field, newValue, oldValue) {
                                                gridStore3.filter('MBTLNUM', newValue);
                                            }
                                        }
                                    },
                                    {
                                        xtype: 'button',
                                        text: 'Clear Filters', // 필터 지우기 버튼
                                        handler: function () {
                                            gridStore3.clearFilter();
                                            // 필터를 지우고 모든 데이터를 다시 표시합니다.
                                        }
                                    },
                                    {
                                        xtype: 'button',
                                        text: 'Add',
                                        handler: function(){
                                            gridStore3_filtered.add(gridStore3.getRange());
                                            gridStore3_filtered.sync();
                                        }
                                    }
                                ]
                            },
                            renderTo: Ext.getBody(),
                            listeners: {
                                itemclick: function(grid, record) {
                                    // alert('Dragging is not available');
                                    // formPanel.getForm().setValues(record.data);
                                    // contentPanel.setActiveItem(formPanel); // Switch to the form panel
                                }
                            }
                        }));

                        // content = '하단에 보일 그리드';
                        bottomPanel.removeAll();
                        if (bottomPanel.items.length === 0) {
                            bottomPanel.add(Ext.create('Ext.grid.Panel', {
                                store: gridStore3_filtered,
                                columns: [
                                    { text: '이름', dataIndex: 'NM', width: 100 },
                                    { text: '핸드폰번호', dataIndex: 'MBTLNUM', width: 100 },
                                    { text: '측정코드', dataIndex: 'MESURE_CODE', width: 100 },
                                    { text: '시작시간', dataIndex: 'MESURE_BGNDT', width: 170,        
                                        renderer: function (value) {
                                            // Format the date and time (assuming 'value' is in YYYYMMDDHHmmss format)
                                            return Ext.Date.format(Ext.Date.parse(value, 'YmdHis'), 'Y-m-d H:i:s');
                                        }
                                    },
                                    { text: '끝난시간', dataIndex: 'MESURE_ENDDT', width: 170,        
                                        renderer: function (value) {
                                            // Format the date and time (assuming 'value' is in YYYYMMDDHHmmss format)
                                            return Ext.Date.format(Ext.Date.parse(value, 'YmdHis'), 'Y-m-d H:i:s');
                                        }
                                    },
                                    { text: '깬 수면시간', dataIndex: 'AWAKE_SLEEP_TIME', width: 100 },
                                    { text: '얕은 수면시간', dataIndex: 'LIGHT_SLEEP_TIME', width: 100 },
                                    { text: '깊은 수면시간', dataIndex: 'DEEP_SLEEP_TIME', width: 100 },
                                    { text: '램 수면시간', dataIndex: 'REM_SLEEP_TIME', width: 100 },
                                    { text: '총 수면시간', dataIndex: 'TOTAL', width: 100 }
                                ],
                                bbar: {
                                    xtype: 'pagingtoolbar',
                                    store: gridStore3_filtered,
                                    displayInfo: true,
                                    displayMsg: 'Displaying {0} - {1} of {2}',
                                    emptyMsg: 'No data to display'
                                },
                                listeners: {
                                    itemclick: function(grid, record) {
                                        alert('hi');
                                    }
                                }
                            }));
                        } else {
                            bottomPanel.items.getAt(0).reconfigure(gridStore2);
                        }
                    } else {
                        middlePanel.items.getAt(0).reconfigure(gridStore2);
                        bottomPanel.items.getAt(0).reconfigure(gridStore2);
                    }
                } else if (id === 2) {
                    // content = '메뉴 2 내용';
                    middlePanel.removeAll();
                    if (middlePanel.items.length === 0) {
                        middlePanel.add(Ext.create('Ext.grid.Panel', {
                            store: gridStore2,
                            columns: [
                                { text: '제목', dataIndex: 'title', flex: 1 },
                                { text: '작성자', dataIndex: 'author', width: 100 },
                                { text: '날짜', dataIndex: 'date', width: 100 }
                            ],
                            bbar: {
                                xtype: 'pagingtoolbar',
                                store: gridStore2,
                                displayInfo: true,
                                displayMsg: 'Displaying {0} - {1} of {2}',
                                emptyMsg: 'No data to display'
                            },
                            listeners: {
                                itemclick: function(grid, record) {
                                    alert('hi');
                                    // formPanel.getForm().setValues(record.data);
                                    // contentPanel.setActiveItem(formPanel); // Switch to the form panel
                                }
                            }
                        }));
                    } else {
                        middlePanel.items.getAt(0).reconfigure(gridStore2);
                    }
                } else if (id === 3) {
                    // content = '메뉴 3 내용';
                    middlePanel.removeAll();
                    if (middlePanel.items.length === 0) {
                        middlePanel.add(Ext.create('Ext.grid.Panel', {
                            store: gridStore,
                            columns: [
                                { text: '제목', dataIndex: 'title', flex: 1 },
                                { text: '작성자', dataIndex: 'author', width: 100 },
                                { text: '날짜', dataIndex: 'date', width: 100 }
                            ],
                            bbar: {
                                xtype: 'pagingtoolbar',
                                store: gridStore,
                                displayInfo: true,
                                displayMsg: 'Displaying {0} - {1} of {2}',
                                emptyMsg: 'No data to display'
                            },
                            listeners: {
                                itemclick: function(grid, record) {
                                    alert('hi');
                                    // formPanel.getForm().setValues(record.data);
                                    // contentPanel.setActiveItem(formPanel); // Switch to the form panel
                                }
                            }
                        }));
                    } else {
                        middlePanel.items.getAt(0).reconfigure(gridStore2);
                    }
                }

                // 중간 레이아웃에 내용 표시
                // middlePanel.update(content);
            }
        }
    });
    // 윗단 레이아웃
    var upperPanel = Ext.create('Ext.panel.Panel', {
        region: 'north',
        height: 30,
        html: '윗단 레이아웃'
    });


    // 중간 레이아웃
    var middlePanel = Ext.create('Ext.panel.Panel', {
        region: 'center',
        layout: 'fit',
        html: '중간 레이아웃'
    });

    // 하단 레이아웃
    var bottomPanel = Ext.create('Ext.panel.Panel', {
        region: 'south',        
        // collapsible: true,
        split: true,
        bodyPadding: 10,
        height: 500,
        minHeight: 250,
        maxHeight: 550
    });

    // 화면 레이아웃
    var viewport = Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [topPanel, menuTree, {
            xtype: 'container',
            region: 'center',
            layout: 'border',
            items: [upperPanel, middlePanel, bottomPanel]
        }]
    });
    

    // ============================== function 모아두기 ====================================

    // 데이터 수 업데이트 함수
    function updateDataCount() {
        var dataCountLabel = Ext.getCmp('dataCountLabel');
        var totalCount = gridStore3.getCount();
        dataCountLabel.setText('조회된 데이터 수: ' + totalCount);
    }
});

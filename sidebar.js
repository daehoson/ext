Ext.onReady(function () {
    // 중앙 콘텐츠 영역에 표시될 컴포넌트
    var contentPanel = Ext.create('Ext.panel.Panel', {
        layout: 'fit',
        items: [{
            xtype: 'textfield',
            fieldLabel: '필드 내용',
            labelAlign: 'top',
            readOnly: true
        }]
    });

    // 트리 패널의 아이템 클릭 이벤트 핸들러
    var treeItemClickHandler = function (tree, record) {
        if (record.get('text') === 'Menu 1') {
            Ext.Ajax.request({
                url: './memberjoin.js', // 회원가입 폼이 있는 HTML 파일 경로
                success: function (response) {
                    contentPanel.removeAll();
                    contentPanel.update(response.responseText);
                },
                failure: function () {
                    contentPanel.removeAll();
                    contentPanel.update('회원가입 폼을 로드할 수 없습니다.');
                }
            });
        
        }else if (record.get('text') === 'Menu 2') {
            contentPanel.removeAll();
    
            var gridStore = Ext.create('Ext.data.Store', {
                fields: ['title', 'author', 'date'],
                cls: 'custom-sidemenu', // 클래스 추가
                data: [
                    { title: '게시물 1', author: '작성자 1', date: '2023-06-30' },
                    { title: '게시물 2', author: '작성자 2', date: '2023-07-01' },
                    { title: '게시물 3', author: '작성자 3', date: '2023-07-01' },
                    { title: '게시물 4', author: '작성자 4', date: '2023-07-01' },
                    { title: '게시물 5', author: '작성자 5', date: '2023-07-01' },
                    { title: '게시물 6', author: '작성자 2', date: '2023-07-01' },
                    { title: '게시물 2', author: '작성자 2', date: '2023-07-01' },
                    { title: '게시물 2', author: '작성자 2', date: '2023-07-01' },
                    { title: '게시물 2', author: '작성자 2', date: '2023-07-01' },
                    { title: '게시물 2', author: '작성자 2', date: '2023-07-01' },
                    { title: '게시물 2', author: '작성자 2', date: '2023-07-01' },
                    { title: '게시물 2', author: '작성자 2', date: '2023-07-01' },
                    { title: '게시물 2', author: '작성자 2', date: '2023-07-01' },
                    { title: '게시물 2', author: '작성자 2', date: '2023-07-01' },
                    { title: '게시물 2', author: '작성자 2', date: '2023-07-01' },
                    { title: '게시물 3', author: '작성자 3', date: '2023-07-02' }
                ],
                pageSize: 10, // Number of records to display per page
                proxy: {
                  type: 'memory',
                  enablePaging: true
                }
            });
    
            var grid = Ext.create('Ext.grid.Panel', {
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
                    emptyMsg: 'No data to display',
                    items: [
                        { xtype: 'button', text: 'Add', handler: function () { /* Add button handler */ } },
                        { xtype: 'button', text: 'Edit', handler: function () { /* Edit button handler */ } },
                        { xtype: 'button', text: 'Delete', handler: function () { /* Delete button handler */ } },
                        '-',
                        { xtype: 'button', text: 'Refresh', handler: function () { /* Refresh button handler */ } },
                        { xtype: 'button', text: 'Export', handler: function () { /* Export button handler */ } },
                        { xtype: 'button', text: 'Print', handler: function () { /* Print button handler */ } },
                        '-',
                        {
                            xtype: 'textfield',
                            emptyText: 'Search',
                            width: 150,
                            listeners: {
                                change: function (field, newValue, oldValue, eOpts) {
                                    // Perform search based on the entered value
                                    gridStore.clearFilter();
                                    if (newValue) {
                                        var searchValue = newValue.toLowerCase();
                                        gridStore.filterBy(function (record) {
                                            return (
                                                record.get('title').toLowerCase().indexOf(searchValue) !== -1 ||
                                                record.get('author').toLowerCase().indexOf(searchValue) !== -1 ||
                                                record.get('date').toLowerCase().indexOf(searchValue) !== -1
                                            );
                                        });
                                    }
                                }
                            }
                        }
                    ]
                }
            });
    
            contentPanel.add(grid);
        }else {
            contentPanel.removeAll();
        }
        // if (record.get('leaf')) {
        //     var text = record.get('text');
        //     contentPanel.down('textfield').setValue(text);
        // }
    };
    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        renderTo: Ext.getBody(),

        items: [{
            xtype: 'panel',
            region: 'west',
            width: 200,
            split: true,
            collapsible: true,
            title: '사이드 메뉴',
            cls: 'custom-sidemenu', // 클래스 추가
            items: [{
                xtype: 'treepanel',
                rootVisible: false,
                store: Ext.create('Ext.data.TreeStore', {
                    root: {
                        expanded: true,
                        children: [
                            {
                                text: 'Menu 1',
                                leaf: true
                            },
                            {
                                text: 'Menu 2',
                                expanded: true,
                                children: [
                                    {
                                        text: 'Submenu 1',
                                        leaf: true
                                    },
                                    {
                                        text: 'Submenu 2',
                                        leaf: true
                                    }
                                ]
                            },
                            {
                                text: 'Menu 3',
                                leaf: true
                            }
                        ]
                    }
                }),
                listeners: {
                    itemclick: treeItemClickHandler
                }
            }]
        }, {
            xtype: 'panel',
            region: 'center',
            layout: 'fit',
            items: [contentPanel]
        }]
    });
    function addCustomStyles() {
        var style = document.createElement('style');
        style.innerHTML = '.custom-sidemenu .x-panel-header { background-color: black; color: white; }';
        document.head.appendChild(style);
    }
    
    // 스타일 추가 함수 호출
    addCustomStyles();
});
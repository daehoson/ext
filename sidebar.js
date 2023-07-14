
Ext.onReady(function(){
    // 중앙 콘텐츠 영역에 표시될 컴포넌트
    var contentPanel = Ext.create('Ext.panel.Panel', {
        layout: 'card',
        items: [{
            xtype: 'container',
            fieldLabel: '필드 내용',
            labelAlign: 'card',
            readOnly: true
        }]
    });

    // 폼 패널
    var formPanel = Ext.create('Ext.form.Panel', {
        bodyPadding: 10,
        items: [{
            xtype: 'textfield',
            fieldLabel: '제목',
            readOnly: true
        }, {
            xtype: 'textfield',
            fieldLabel: '작성자',
            readOnly: true
        }, {
            xtype: 'textfield',
            fieldLabel: '날짜',
            readOnly: true
        }, {
            xtype: 'textareafield',
            fieldLabel: '내용',
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
        } else if (record.get('text') === 'Menu 2') {
            contentPanel.removeAll();

            var gridStore = Ext.create('Ext.data.Store', {
                fields: ['title', 'author', 'date'],
                data: [
                    { title: '게시물 1', author: '작성자 1', date: '2023-06-30' },
                    { title: '게시물 2', author: '작성자 2', date: '2023-07-01' },
                    { title: '게시물 3', author: '작성자 3', date: '2023-07-01' },
                    { title: '게시물 4', author: '작성자 4', date: '2023-07-01' },
                    { title: '게시물 5', author: '작성자 5', date: '2023-07-01' },
                    { title: '게시물 6', author: '작성자 2', date: '2023-07-01' },
                    { title: '게시물 7', author: '작성자 2', date: '2023-07-01' },
                    { title: '게시물 8', author: '작성자 2', date: '2023-07-01' },
                    { title: '게시물 9', author: '작성자 2', date: '2023-07-01' },
                    { title: '게시물 10', author: '작성자 2', date: '2023-07-01' },
                    { title: '게시물 11', author: '작성자 2', date: '2023-07-01' },
                    { title: '게시물 12', author: '작성자 2', date: '2023-07-01' },
                    { title: '게시물 13', author: '작성자 2', date: '2023-07-01' },
                    { title: '게시물 14', author: '작성자 2', date: '2023-07-01' },
                    { title: '게시물 15', author: '작성자 2', date: '2023-07-01' },
                    { title: '게시물 16', author: '작성자 2', date: '2023-07-01' },
                    { title: '게시물 17', author: '작성자 3', date: '2023-07-02' }
                ]
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
                        { xtype: 'button', text: 'Add', handler: function () { 
                            contentPanel.removeAll();
                            /* Add button handler */ } 
                        },
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
                },
                listeners: {
                    itemclick: function (grid, record) {
                        alert("hi");
                        formPanel.getForm().setValues(record.data);
                        // contentPanel.setActiveItem(formPanel); // Switch to the form panel
                    }
                }
            });

            contentPanel.add(grid); // Add the grid to the content panel
            // contentPanel.add(formPanel); // Add the form panel to the content panel
        } else {
            contentPanel.removeAll();
        }
    };

    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        // renderTo: Ext.getBody(),
        // renderTo: 'myApp',
        items: [{
            xtype: 'panel',
            region: 'north',
            height: 50,
            layout: {
                type: 'hbox',
                pack: 'start',
                align: 'middle'
            },
            items: [{
                xtype: 'component',
                html: '<h1>My Application</h1>',
                margin: '0 20'
            }, {
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'button',
                    text: 'Menu 1',
                    handler: function () { /* Menu 1 button handler */ }
                }, {
                    xtype: 'button',
                    text: 'Menu 2',
                    handler: function () { /* Menu 2 button handler */ }
                }, {
                    xtype: 'button',
                    text: 'Menu 3',
                    handler: function () { /* Menu 3 button handler */ }
                }]
            }]
        }, {
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
});
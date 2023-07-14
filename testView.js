Ext.onReady(function() {
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
            { title: '게시물 12', author: '작성자 2', date: '2023-07-01' }
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
    var gridStore2 = Ext.create('Ext.data.Store', {
        fields: ['title', 'author', 'date'],
        data: [
            { title: '게시물 11', author: '작성자 1', date: '2023-06-30' },
            { title: '게시물 12', author: '작성자 2', date: '2023-07-01' },
            { title: '게시물 13', author: '작성자 3', date: '2023-07-01' },
            { title: '게시물 14', author: '작성자 4', date: '2023-07-01' },
            { title: '게시물 15', author: '작성자 5', date: '2023-07-01' },
            { title: '게시물 16', author: '작성자 2', date: '2023-07-01' },
            { title: '게시물 17', author: '작성자 2', date: '2023-07-01' },
            { title: '게시물 18', author: '작성자 2', date: '2023-07-01' },
            { title: '게시물 19', author: '작성자 2', date: '2023-07-01' },
            { title: '게시물 110', author: '작성자 2', date: '2023-07-01' },
            { title: '게시물 111', author: '작성자 2', date: '2023-07-01' },
            { title: '게시물 112', author: '작성자 2', date: '2023-07-01' }
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

    var button3 = Ext.create('Ext.button.Button', {
        text: 'Menu 3',
        handler: menuButtonClickHandler
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
                items: [button1, button2, button3]
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
                expanded: true,
                children: [
                    {
                        text: 'Menu 1',
                        leaf: true
                    },
                    {
                        text: 'Menu 2',
                        leaf: true
                    },
                    {
                        text: 'Menu 3',
                        leaf: true
                    }
                ]
            }
        }),
        listeners: {
            itemclick: function(tree, record) {
                var text = record.get('text');
                var content = '';

                // 메뉴 아이템에 따른 내용 설정
                if (text === 'Menu 1') {
                    content = '메뉴 1 내용';
                } else if (text === 'Menu 2') {
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
                } else if (text === 'Menu 3') {
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
        height: 100,
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
        height: 100,
        html: '하단 레이아웃'
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
});

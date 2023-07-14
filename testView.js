Ext.onReady(function() {
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
                    content = '메뉴 2 내용';
                } else if (text === 'Menu 3') {
                    content = '메뉴 3 내용';
                }

                // 중간 레이아웃에 내용 표시
                middlePanel.update(content);
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

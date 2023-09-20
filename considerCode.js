    // 안 쓰는데 그냥 코드 참고용

    // 그리드 
    // var grid = Ext.create('Ext.grid.Panel', {
    //     store: gridStore,
    //     columns: [
    //         { text: '제목', dataIndex: 'title', flex: 1 },
    //         { text: '작성자', dataIndex: 'author', width: 100 },
    //         { text: '날짜', dataIndex: 'date', width: 100 }
    //     ],
    //     bbar: {
    //         xtype: 'pagingtoolbar',
    //         store: gridStore,
    //         displayInfo: true,
    //         displayMsg: 'Displaying {0} - {1} of {2}',
    //         emptyMsg: 'No data to display',
    //         items: [
    //             { xtype: 'button', text: 'Add', handler: function () { 
    //                 contentPanel.removeAll();
    //                 /* Add button handler */ } 
    //             },
    //             { xtype: 'button', text: 'Edit', handler: function () { /* Edit button handler */ } },
    //             { xtype: 'button', text: 'Delete', handler: function () { /* Delete button handler */ } },
    //             '-',
    //             { xtype: 'button', text: 'Refresh', handler: function () { /* Refresh button handler */ } },
    //             { xtype: 'button', text: 'Export', handler: function () { /* Export button handler */ } },
    //             { xtype: 'button', text: 'Print', handler: function () { /* Print button handler */ } },
    //             '-',
    //             {
    //                 xtype: 'button',
    //                 text: 'Export to Excel',
    //                 handler: function () {
    //                     // Create a worksheet object from the grid store data
    //                     var worksheet = XLSX.utils.json_to_sheet(gridStore.getData().items.map(function (record) {
    //                         return record.data;
    //                     }));
    
    //                     // Create a workbook and add the worksheet to it
    //                     var workbook = XLSX.utils.book_new();
    //                     XLSX.utils.book_append_sheet(workbook, worksheet, 'Grid Data');
    
    //                     // Save the workbook as an Excel file
    //                     XLSX.writeFile(workbook, 'grid_data.xlsx');
    //                 }
    //             },
    //             {
    //                 xtype: 'textfield',
    //                 emptyText: 'Search',
    //                 width: 150,
    //                 listeners: {
    //                     change: function (field, newValue, oldValue, eOpts) {
    //                         // Perform search based on the entered value
    //                         gridStore.clearFilter();
    //                         if (newValue) {
    //                             var searchValue = newValue.toLowerCase();
    //                             gridStore.filterBy(function (record) {
    //                                 return (
    //                                     record.get('title').toLowerCase().indexOf(searchValue) !== -1 ||
    //                                     record.get('author').toLowerCase().indexOf(searchValue) !== -1 ||
    //                                     record.get('date').toLowerCase().indexOf(searchValue) !== -1
    //                                 );
    //                             });
    //                         }
    //                     }
    //                 }
    //             }
    //         ]
    //     },
    //     listeners: {
    //         itemclick: function (grid, record) {
    //             alert("hi");
    //             formPanel.getForm().setValues(record.data);
    //             // contentPanel.setActiveItem(formPanel); // Switch to the form panel
    //         }
    //     }
    // });



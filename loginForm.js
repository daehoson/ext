Ext.onReady(function() {
  var loginForm = Ext.create('Ext.form.Panel', {
    layout: 'center',
    items: [
      {
        xtype: 'form',
        title: 'Login',
        width: 400,
        bodyPadding: 20,
        style: {
          backgroundColor: '#f1f1f1',
          borderRadius: '5px',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)'
        },
        defaults: {
          xtype: 'textfield',
          anchor: '100%',
          labelAlign: 'top',
          margin: '0 0 10'
        },
        items: [
          {
            fieldLabel: 'Username',
            name: 'username',
            allowBlank: false
          },
          {
            fieldLabel: 'Password',
            name: 'password',
            inputType: 'password',
            allowBlank: false
          },
          {
            xtype: 'button',
            text: 'Login',
            formBind: true,
            disabled: true,
            width: '100%',
            scale: 'large',
            style: {
              marginTop: '20px'
            },
            // handler: function() {
            //   var form = this.up('form').getForm();
            //   if (form.isValid()) {
            //     Ext.Msg.alert('Success', 'Login successful!');
            //   } else {
            //     Ext.Msg.alert('Error', 'Please enter username and password.');
            //   }
            // }
            handler: function() {
              var form = this.up('form').getForm();
              if (form.isValid()) {
                  var requestData = {
                      mberNo: form.findField('username').getValue(),
                      pwd: form.findField('password').getValue()
                  };

                  Ext.Ajax.request({
                      url: 'http://localhost:8081/huno/v1/mydata',
                      method: 'POST', // 요청 메서드를 POST로 변경
                      jsonData: requestData, // jsonData로 전송
                      success: function(response) {
                          Ext.Msg.alert('Success', 'Login successful!');
                          Ext.getCmp('myApp').removeAll(); // myApp 엘리먼트의 내용 제거
                          Ext.getCmp('myApp').add(Ext.create('TestView')); // TestView를 추가하여 표시
                      },
                      failure: function(response) {
                          Ext.Msg.alert('Error', 'Login failed. Please check your credentials.');
                          
                      }
                  });
              } else {
                  Ext.Msg.alert('Error', 'Please enter username and password.');
              }
          }
          }
        ]
      }
    ]
  });
  // loginForm.render(Ext.getBody());
});

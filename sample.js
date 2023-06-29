Ext.onReady(function() {
  Ext.create('Ext.container.Viewport', {
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
            handler: function() {
              var form = this.up('form').getForm();
              if (form.isValid()) {
                Ext.Msg.alert('Success', 'Login successful!');
              } else {
                Ext.Msg.alert('Error', 'Please enter username and password.');
              }
            }
          }
        ]
      }
    ]
  });
});

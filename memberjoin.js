Ext.onReady(function(){
    Ext.create('Ext.form.Panel', {
        title: '회원가입',
        bodyPadding: 5,
        width: 350,

        // The form will submit an AJAX request to this URL when submitted
        url: 'save-form.php',

        // Fields will be arranged vertically, stretched to full width
        layout: 'anchor',
        defaults: {
            anchor: '100%'
        },

        // The fields
        defaultType: 'textfield',
        items: [{
            fieldLabel: '이름',
            name: 'firstName',
            allowBlank: false
        },{
            fieldLabel: '성',
            name: 'lastName'
        },{
            fieldLabel: '이메일',
            name: 'email',
            vtype: 'email'
        },{
            fieldLabel: '비밀번호',
            name: 'password',
            inputType: 'password'
        },{
            fieldLabel: '비밀번호 확인',
            name: 'passwordConfirm',
            inputType: 'password'
        }],

        // Reset and Submit buttons
        buttons: [{
            text: '리셋',
            handler: function() {
                this.up('form').getForm().reset();
            }
        }, {
            text: '등록',
            formBind: true, //only enabled once the form is valid
            disabled: true,
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {
                           Ext.Msg.alert('Success', action.result.msg);
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result.msg);
                        }
                    });
                }
            }
        }],
        renderTo: Ext.getBody()
    });
});

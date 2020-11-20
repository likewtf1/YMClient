using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Text;
using System.Windows.Forms;
using System.IO;
using System.Net;


namespace YMClient
{

    
    public partial class Form3 : Form
    {
        private bool AddQuestion(string title, string text)
        {
            String url = @"http://167.179.105.202:8000/addquestion/";
            HttpWebRequest webRequest = (HttpWebRequest)WebRequest.Create(url);
            webRequest.Method = "POST";
            webRequest.ContentType = "application/x-www-form-urlencoded";

            StringBuilder builder = new StringBuilder();
            builder.Append("&");
            builder.AppendFormat("uid={0}", User.GetInstance().uid);
            builder.Append("&");
            builder.Append("password=" + User.GetInstance().pwd);
            builder.Append("&");
            builder.Append("title=" + title);
            builder.Append("&");
            builder.Append("text=" + text);

           // string content = @"[{uid:'" + User.GetInstance().uid.ToString() + @"',password:'" + User.GetInstance().pwd + @"',title:'" + title + @"',text:'" + text + @"']";

            byte[] data = Encoding.UTF8.GetBytes(builder.ToString());
            webRequest.ContentLength = data.Length;
            using (Stream reqStream = webRequest.GetRequestStream())
            {
                reqStream.Write(data, 0, data.Length);
                reqStream.Close();
            }


            HttpWebResponse webResponse = (HttpWebResponse)webRequest.GetResponse();
            Stream stream = webResponse.GetResponseStream();
            string result;
            using (StreamReader reader = new StreamReader(stream, Encoding.UTF8))
            {
                result = reader.ReadToEnd();
            }
            //MessageBox.Show(result);
            return true;
        }
        public Form3()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            if(textBox1.Text.Trim()=="")
            {
                MessageBox.Show("问题为空");
                return;
            }
            if(AddQuestion(textBox1.Text, textBox2.Text))
            {
                this.Close();
            }
        }
    }
}

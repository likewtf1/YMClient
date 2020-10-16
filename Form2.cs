using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Text;
using System.Windows.Forms;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.IO;
using System.Net;

namespace YMClient
{

   
    public partial class Form2 : Form
    {
        public struct QS
        {
           public int uid;
           public string title;
           public string text;
        };
        private List<string> detail_q;
        private List<string> detail_d;
        public void GetQSJSON()
        {
            listBox1.Items.Clear();
            String url = @"http://167.179.105.202:8000/questionlist/";
            HttpWebRequest webRequest = (HttpWebRequest)WebRequest.Create(url);
            webRequest.Method = "POST";
            webRequest.ContentType = "application/x-www-form-urlencoded";
            StringBuilder builder = new StringBuilder();
            builder.Append("&");
            builder.AppendFormat("uid={0}", User.GetInstance().uid);
            builder.Append("&");
            builder.Append("password="+User.GetInstance().pwd);

        //    string content = "{\"uid\":'" + User.GetInstance().uid.ToString() + "',\"password\":'" + User.GetInstance().pwd + @"'}";
        //    MessageBox.Show(builder.ToString());
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
            MessageBox.Show(result);

            string jsonstring = result;
                //@"[{uid:'1234',title:'hhh',text:'hhhh'},{uid:'4321',title:'gggg',text:'ggg'}]";
            List<QS> QSList = JsonConvert.DeserializeObject<List<QS>>(jsonstring);
            if (QSList == null) return;
 //           JArray jsonObj = JArray.Parse(jsonstring);
            int count = 0;
            foreach(QS QSobj in QSList)
            {
                count++;
                detail_q.Add(QSobj.title);
                detail_d.Add(QSobj.text);
                listBox1.Items.Add(String.Format("问题{0}",count));
            }
        }
        public Form2()
        {
            detail_d = new List<string>();
            detail_q = new List<string>();
            InitializeComponent();
            GetQSJSON();
        }

        private void listBox1_SelectedIndexChanged(object sender, EventArgs e)
        {
            int index = listBox1.SelectedIndex;
            textBox1.Text = detail_q[index];
            textBox2.Text = detail_d[index];
        }
        private void F3_FormClosing(object sender, FormClosingEventArgs e)
        {
            GetQSJSON();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            Form3 f = new Form3();
            f.FormClosing += F3_FormClosing;
            f.ShowDialog();
        }

    }
}

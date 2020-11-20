using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Net;
using System.IO;

namespace YMClient
{
    
    
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void label1_Click(object sender, EventArgs e)
        {

        }

        private void label2_Click(object sender, EventArgs e)
        {

        }

        private bool Login(string name,string pwd)
        {
            String url= @"http://167.179.105.202:8000/login/";
            HttpWebRequest webRequest = (HttpWebRequest)WebRequest.Create(url);
            webRequest.Method = "POST";
            webRequest.ContentType = "application/x-www-form-urlencoded";
            StringBuilder builder = new StringBuilder();
            builder.Append("&");
            builder.AppendFormat("username=" + name);
            builder.Append("&");
            builder.Append("password=" + pwd);
            //string content = @"[{username:'"+name+@"',password:'"+pwd+@"'}]";

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
            User.GetInstance().uid = Int32.Parse(result);
            User.GetInstance().pwd = pwd;
            return User.GetInstance().uid != 0;
        }


        private bool Register(string name, string pwd)
        {
            String url = @"http://167.179.105.202:8000/register/";
            HttpWebRequest webRequest = (HttpWebRequest)WebRequest.Create(url);
            webRequest.Method = "POST";
            webRequest.ContentType = "application/x-www-form-urlencoded";
            StringBuilder builder = new StringBuilder();
            builder.Append("&");
            builder.AppendFormat("username=" + name);
            builder.Append("&");
            builder.Append("password=" + pwd);

            //string content = @"[{username:'" + name + @"',password:'" + pwd + @"'}]";

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
            User.GetInstance().uid = Int32.Parse(result);
            User.GetInstance().pwd = pwd;
            return User.GetInstance().uid != 0;
        }
        private void button1_Click(object sender, EventArgs e)
        {
            string name = textBox1.Text;
            string pwd = textBox2.Text;
            name = name.Trim();
            if (name == "")
            {
                MessageBox.Show("用户名为空");
                return ;
            }
           // MessageBox.Show(name);
            if(Login(name , pwd))
            {
                Form2 f = new Form2();
                f.FormClosing += EExit;
                f.Show();
                this.Hide();
            }
            else
            {
                MessageBox.Show("登录失败");
            }
        }
        private void EExit(object sender, EventArgs e)
        {
            this.Close();
        }
        private void button2_Click(object sender, EventArgs e)
        {
            string name = textBox1.Text;
            string pwd = textBox2.Text;
            name = name.Trim();
            if (name == "")
            {
                MessageBox.Show("用户名为空");
                return;
            }
            if (Register(name, pwd))
            {
                Form2 f = new Form2();
                f.FormClosing += EExit;
                f.Show();
                this.Hide();
            }
            else
            {
                MessageBox.Show("注册失败");
            }
        }
    };
    public class User
    {
        public int uid { get; set; }
        public string pwd { get; set; }
        private static User instance;
        private User() { }
        public static User GetInstance()
        {
            if (instance == null)
            {
                instance = new User();
            }
            return instance;
        }
    };
}


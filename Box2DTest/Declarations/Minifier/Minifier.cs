using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;

namespace minifier
{
	/// <summary>
	/// Run this minifier to generate the min version of box2dweb from the individual files.
	/// 
	/// Parses box2dweb.d.ts:
	///		Comments are copied directly over immediately
	///		references have their modules and import statements copied
	///		references do not have global or root level comments copied (removes redundant license info)
	/// </summary>
	public class Minifier
	{
		public static string dirLevel = "../../../";

		public static string box2dwebfile = "box2dweb.d.ts";
		public static string box2dwebminfile = "box2dweb-min.d.ts";

		public static HashSet<string> namespaces = new HashSet<string>();
		public static List<string> modules = new List<string>();

		public static string newline;

		static void Main(string[] args)
		{
			var contents = new StreamReader(dirLevel + box2dwebfile);
			var output = "";

			var outputFile = new StreamWriter(dirLevel + box2dwebminfile);
			newline = outputFile.NewLine;

			while (!contents.EndOfStream)
			{
				var line = contents.ReadLine();

				// comment, copy over
				if(line.StartsWith("/**") ||
					line.StartsWith("*") ||
					line.StartsWith("**/"))
				{
					output += line + newline;
				}
				// <reference>, fetch file and insert its contents
				else if(line.StartsWith("///"))
				{
					var start = line.IndexOf("\"") + 1;
					var end = line.LastIndexOf("\"");
					var path = line.Substring(start, end - start);

					ParseReferenceFile(new StreamReader(dirLevel + path));
				}
			}

			output += newline;
			// output namespaces at the top
			foreach (var name in namespaces)
			{
				output += name + newline;
			}

			output += newline;
			// output each file at the bottom
			foreach (var module in modules)
			{
				output += module + newline;
			}
			
			// finally write the file out
			outputFile.WriteLine(output);
			outputFile.Close();
		}

		public static void ParseReferenceFile(StreamReader file) 
		{
			while (!file.EndOfStream)
			{
				var line = file.ReadLine();

				// there is a module, parse until the end } is found and save the contents.
				if (line.StartsWith("module"))
				{
					// break out early if it is a one line declaration as it has no real definitions
					if (line.Contains("}"))
					{
						continue;
					}


					var module = line + newline;
					do
					{
						line = file.ReadLine();
						module += line + newline;
					} while (!line.Equals("}"));

					modules.Add(module);
				}
				// there is an import statement, save this for namespace declarations
				else if (line.StartsWith("import"))
				{
					namespaces.Add(line);
				}
			}
		}
	}
}

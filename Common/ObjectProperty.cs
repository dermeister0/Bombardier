using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace Bombardier.Common
{
    public enum PropertyType { Undefined, Integer, Float, String };

    [Serializable]
    [DataContract]
    public struct ObjectProperty
    {
        PropertyType type;

        public PropertyType Type { get { return type; } }

        int integerValue;

        float floatValue;

        string stringValue;

        public string Value
        {
            get
            {
                switch (Type)
                {
                    case PropertyType.Integer:
                        return integerValue.ToString();
                    case PropertyType.Float:
                        return floatValue.ToString();
                    case PropertyType.String:
                        return stringValue.ToString();
                    default:
                        throw new ArgumentOutOfRangeException();
                }
            }
        }
        
        public ObjectProperty(PropertyType type)
            : this()
        {
            this.type = type;
        }

        public ObjectProperty(int value)
            : this(PropertyType.Integer)
        {
            integerValue = value;
        }
        
        public ObjectProperty(float value)
            : this(PropertyType.Float)
        {
            floatValue = value;
        }

        public ObjectProperty(string value)
            : this(PropertyType.String)
        {
            stringValue = value;
        }

        public static implicit operator ObjectProperty(int value)
        {
            return new ObjectProperty(value);
        }

        public static implicit operator ObjectProperty(float value)
        {
            return new ObjectProperty(value);
        }

        public static implicit operator ObjectProperty(string value)
        {
            return new ObjectProperty(value);
        }

        public static implicit operator int(ObjectProperty property)
        {
            CheckType(property, PropertyType.Integer);
            return property.integerValue;
        }

        public static implicit operator float(ObjectProperty property)
        {
            CheckType(property, PropertyType.Float);
            return property.floatValue;
        }

        public static implicit operator string(ObjectProperty property)
        {
            CheckType(property, PropertyType.String);
            return property.stringValue;
        }

        static void CheckType(ObjectProperty property, PropertyType type)
        {
            if (property.type != type)
                throw new InvalidOperationException("Wrong property type.");
        }
    }
}

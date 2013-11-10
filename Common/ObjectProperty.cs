using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace Bombardier.Common
{
    public enum PropertyType { Undefined, Integer, Float, String, Boolean };

    [Serializable]
    [DataContract]
    public struct ObjectProperty : IEquatable<ObjectProperty>
    {
        PropertyType type;

        public PropertyType Type { get { return type; } }

        object value;

        [DataMember]
        public string Value
        {
            get
            {
                return Convert.ToString(this.value, CultureInfo.InvariantCulture);
            }
            private set { } // For WCF.
        }
        
        public ObjectProperty(PropertyType type)
            : this()
        {
            this.type = type;
        }

        public ObjectProperty(int value)
            : this(PropertyType.Integer)
        {
            this.value = value;
        }
        
        public ObjectProperty(float value)
            : this(PropertyType.Float)
        {
            this.value = value;
        }

        public ObjectProperty(string value)
            : this(PropertyType.String)
        {
            this.value = value;
        }

        public ObjectProperty(bool value)
            : this(PropertyType.Boolean)
        {
            this.value = value;
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

        public static implicit operator ObjectProperty(bool value)
        {
            return new ObjectProperty(value);
        }

        public static implicit operator int(ObjectProperty property)
        {
            CheckType(property, PropertyType.Integer);
            return Convert.ToInt32(property.value, CultureInfo.InvariantCulture);
        }

        public static implicit operator float(ObjectProperty property)
        {
            CheckType(property, PropertyType.Float);
            return Convert.ToSingle(property.value, CultureInfo.InvariantCulture);
        }

        public static implicit operator string(ObjectProperty property)
        {
            CheckType(property, PropertyType.String);
            return Convert.ToString(property.value, CultureInfo.InvariantCulture);
        }

        public static implicit operator bool(ObjectProperty property)
        {
            CheckType(property, PropertyType.String);
            return Convert.ToBoolean(property.value, CultureInfo.InvariantCulture);
        }

        static void CheckType(ObjectProperty property, PropertyType type)
        {
            if (property.type != type)
                throw new InvalidOperationException("Wrong property type.");
        }
        
        public bool Equals(ObjectProperty other)
        {
            return type == other.type && value.Equals(other.value);
        }
        
        public override bool Equals(object obj)
        {
            if (obj is ObjectProperty)
                return Equals((ObjectProperty)obj);
            
            return false;
        }

        public override int GetHashCode()
        {
            return type.GetHashCode() * 3 + value.GetHashCode();
        }

        public static bool operator ==(ObjectProperty propertyA, ObjectProperty propertyB)
        {
            return propertyA.Equals(propertyB);
        }

        public static bool operator !=(ObjectProperty propertyA, ObjectProperty propertyB)
        {
            return !propertyA.Equals(propertyB);
        } 
    }
}

import React, { Component } from 'react';
import { View } from 'react-native';

class DummyComponent extends Component {

    render() {
        return (
            <View>
                <Form style={styles.formStyle}>
                    {/* <List> */}
                    <Label style={{ color: "#888" }}>How long can the label for the ddate picker be when I'm using nativebase</Label>

                    {/* <ListItem> */}
                    {/* <Left> */}
                    <DatePicker
                        defaultDate={new Date(2018, 4, 4)}
                        minimumDate={new Date(2018, 1, 1)}
                        maximumDate={new Date(2018, 12, 31)}
                        locale={"en"}
                        timeZoneOffsetInMinutes={undefined}
                        modalTransparent={false}
                        animationType={"fade"}
                        androidMode={"default"}
                        placeHolderText="Select date"
                        textStyle={{ color: "green" }}
                        placeHolderTextStyle={{ color: "#d3d3d3" }}
                        onDateChange={this.setDate}
                        style={{ width: 200 }}
                    />
                    {/* </Left> */}
                    {/* <Body /> */}

                    {/* <Right> */}



                    <Text>
                        Date: {this.state.chosenDate.toString().substr(4, 12)}
                    </Text>
                    {/* </Right> */}
                    {/* </ListItem> */}
                    {/* </List> */}

                </Form>
                <List>
                    <ListItem itemDivider>
                        <Text>Dummy form section divider</Text>
                    </ListItem>
                </List>

                <Form>
                    <Item picker>
                        <Label style={{ color: "#888" }}>Select your SIM here and see how long can we have the label</Label>
                        <Picker
                            mode="dropdown"
                            iosHeader="Select your SIM"
                            iosIcon={<Icon name="ios-arrow-down-outline" />}
                            placeholder={"Placeholder"}
                            enabled={true}
                            style={{ width: undefined }}
                            selectedValue={this.state.selected}
                            onValueChange={this.onValueChange.bind(this)}
                        >
                            <Picker.Item label="Wallet" value="key0" />
                            <Picker.Item label="ATM Card" value="key1" />
                            <Picker.Item label="Debit Card" value="key2" />
                            <Picker.Item label="Credit Card" value="key3" />
                            <Picker.Item label="Net Banking" value="key4" />
                        </Picker>
                    </Item>
                </Form>
                <Form>




                    <Picker
                        note
                        mode="dropdown"
                        style={{ width: undefined }}
                        selectedValue={this.state.selected}
                        onValueChange={this.onValueChange.bind(this)}
                    >
                        <Picker.Item label="Wallet" value="key0" />
                        <Picker.Item label="ATM Card" value="key1" />
                        <Picker.Item label="Debit Card" value="key2" />
                        <Picker.Item label="Credit Card" value="key3" />
                        <Picker.Item label="Net Banking" value="key4" />
                    </Picker>

                    <List>
                        <ListItem itemDivider>
                            <Text>Dummy form section divider</Text>
                        </ListItem>
                    </List>

                    <List>
                        <Label style={{ color: "#888" }}>This is the label for the checkboxes</Label>
                        <ListItem selected={this.state.checked}>
                            <CheckBox
                                onPress={() => {
                                    this.setState({
                                        checked: !this.state.checked
                                    })
                                    console.log("Printing from checkbox ")
                                }
                                }
                                checked={this.state.checked}
                                disabled
                            />
                            <Body>
                                <Text>Daily Stand Up</Text>
                            </Body>
                        </ListItem>
                        <ListItem selected={this.state.checked}>
                            <CheckBox
                                onPress={() => this.setState({
                                    checked: !this.state.checked
                                })}
                                checked={this.state.checked}
                                disabled
                            />
                            <Body>
                                <Text>Logistics support</Text>
                            </Body>
                        </ListItem>
                    </List>
                    <Form>
                        <List>
                            <ListItem itemDivider>
                                <Text>Dummy form section divider</Text>
                            </ListItem>
                        </List>
                    </Form>

                    <Form>

                        <List>
                            <Item>
                                <Body>

                                    <Label style={{ color: "#888", marginTop: 10 }}>This is the label for the radio buttons. What happens if the label is multiline? </Label>
                                </Body>
                                <Right>
                                    <Button small style={{ backgroundColor: "#FF9501" }}>
                                        <Icon name="help" />
                                    </Button>
                                </Right>
                            </Item>


                            <ListItem>
                                <Left>
                                    <Text>Daily Stand Up Meetings How do they turn out</Text>
                                </Left>

                                <Right>
                                    <Radio selected={this.state.radioSelection} onPress={() => {
                                        this.setState({
                                            radioSelection: !this.state.radioSelection
                                        })
                                    }}
                                        disabled
                                    />
                                </Right>


                            </ListItem>
                            <ListItem>
                                <Left>
                                    <Text>Discussion with Client</Text>
                                </Left>
                                <Right>
                                    <Radio selected={this.state.radioSelection} onPress={() => {
                                        this.setState({
                                            radioSelection: !this.state.radioSelection
                                        })
                                    }}
                                        disabled
                                    />
                                </Right>
                            </ListItem>
                        </List>
                    </Form>
                    <List>
                        <Textarea rowSpan={5} bordered placeholder="Source expression" onChangeText={this.test.bind(this)} />
                        <Textarea rowSpan={5} bordered placeholder="Target expression" defaultValue={"Can this be the default value"} enabled={false} />
                        <Item stackedLabel disabled>
                            <Label>Hint! Hint!Hint!Hint!Hint!Hint!Hint!Hint!Hint!</Label>
                            <Input defaultValue={"Testing for default value"} disabled />
                        </Item>
                    </List>
                    <ListItem icon>
                        <Left>
                            <Button style={{ backgroundColor: "#FF9501" }}>
                                <Icon name="help" />
                            </Button>
                        </Left>
                        <Body>
                            <Text>Use Hint</Text>
                        </Body>
                        <Right>
                            <Switch value={this.state.switchValue} onValueChange={() => this.setState({
                                switchValue: !this.state.switchValue
                            })} />
                        </Right>
                    </ListItem>
                </Form>
                <Body style={styles.buttonStyle}>
                    <Button rounded success>
                        <Text>Submit</Text>
                    </Button>
                </Body>
            </View>
        )
    }
}

export default DummyComponent;